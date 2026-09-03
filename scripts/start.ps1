<#
  Windows one-click setup for LEGO Jules (development).
  - Uses corepack to activate pnpm locally (pnpm@9.5.0).
  - Installs dependencies (pnpm install).
  - Attempts to install PostgreSQL and Redis using winget or choco.
  - Waits for services (ports 5432, 6379).
  - Copies .env.example -> .env if missing.
  - Runs db:migrate/generate/seed (if scripts exist) and starts dev servers.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== LEGO Jules - Windows one-click setup ===`n"

function Is-Admin {
  $current = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($current)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js bulunamadı. Lütfen Node.js >= 20 kurulu olduğundan emin olun." -ForegroundColor Yellow
  Write-Host "https://nodejs.org/ adresinden Node.js yükleyebilirsiniz." -ForegroundColor Yellow
  # continue: Node check only warns — corepack requires Node >=20.
}

# Ensure corepack exists and prepare pnpm
if (-not (Get-Command corepack -ErrorAction SilentlyContinue)) {
  Write-Host "corepack bulunamadı. Node >=20 ile gelmelidir; devam ediyorum ama pnpm kurulumu başarısız olabilir." -ForegroundColor Yellow
} else {
  Write-Host "corepack var: pnpm@9.5.0 etkinleştiriliyor..."
  try {
    corepack prepare pnpm@9.5.0 --activate
    Write-Host "pnpm etkinleştirildi."
  } catch {
    Write-Host "corepack ile pnpm etkinleştirilirken hata: $_" -ForegroundColor Yellow
  }
}

# Try to install packages with winget or choco
function Try-Install-Service {
  param([string]$name, [scriptblock]$wingetCmd, [scriptblock]$chocoCmd)

  if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host "winget bulundu — $name yükleniyor (winget)..."
    try { & $wingetCmd; return $true } catch { Write-Host "winget ile $name yüklenemedi: $_" -ForegroundColor Yellow }
  }
  if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "choco bulundu — $name yükleniyor (choco)..."
    try { & $chocoCmd; return $true } catch { Write-Host "choco ile $name yüklenemedi: $_" -ForegroundColor Yellow }
  }

  Write-Host "Otomatik yükleme için winget veya choco bulunamadı ya da yükleme başarısız oldu. Lütfen manuel kurulum yapın: $name" -ForegroundColor Yellow
  return $false
}

# Attempt Postgres installation
Write-Host "`n== Postgres (attempt install) =="
$pgInstalled = $false
try {
  if (Get-Command psql -ErrorAction SilentlyContinue) {
    Write-Host "psql zaten yüklü."
    $pgInstalled = $true
  } else {
    $pgInstalled = Try-Install-Service -name "PostgreSQL" `
      -wingetCmd { winget install --id PostgreSQL.PostgreSQL -e --accept-package-agreements --accept-source-agreements } `
      -chocoCmd { choco install postgresql -y }
  }
} catch {
  Write-Host "Postgres yükleme adımında hata: $_" -ForegroundColor Yellow
}

# Attempt Redis installation
Write-Host "`n== Redis (attempt install) =="
$redisInstalled = $false
try {
  if (Get-Command redis-server -ErrorAction SilentlyContinue -or Get-Command redis-cli -ErrorAction SilentlyContinue) {
    Write-Host "Redis zaten yüklü."
    $redisInstalled = $true
  } else {
    # Winget Redis id may vary; try a common one, fallback to choco redis-64
    $redisWingetOk = $false
    try {
      if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "winget ile Redis denemesi..."
        # winget package id can differ; try a common published package
        winget install --id=Redis.Redis -e --accept-package-agreements --accept-source-agreements -h
        $redisWingetOk = $true
      }
    } catch {
      Write-Host "winget ile Redis yükleme başarısız veya paket id bulunamadı." -ForegroundColor Yellow
    }
    if (-not $redisWingetOk -and (Get-Command choco -ErrorAction SilentlyContinue)) {
      Try-Install-Service -name "Redis" -wingetCmd { } -chocoCmd { choco install redis-64 -y }
    } elseif (-not $redisWingetOk) {
      Write-Host "Redis otomatik yüklenemedi." -ForegroundColor Yellow
    }
  }
} catch {
  Write-Host "Redis yükleme adımında hata: $_" -ForegroundColor Yellow
}

# Wait for services (if installed) with timeout
function Wait-For-Port {
  param([int]$port, [int]$timeoutSec = 60)
  $end = (Get-Date).AddSeconds($timeoutSec)
  while ((Get-Date) -lt $end) {
    $r = Test-NetConnection -ComputerName "127.0.0.1" -Port $port -WarningAction SilentlyContinue
    if ($r.TcpTestSucceeded) { return $true }
    Start-Sleep -Seconds 2
  }
  return $false
}

Write-Host "`n== Servis kontrolü (port 5432 -> Postgres, 6379 -> Redis) =="
if ($pgInstalled) {
  Write-Host "Postgres için port 5432 bekleniyor..."
  if (Wait-For-Port -port 5432 -timeoutSec 60) { Write-Host "Postgres portu görünüyor." } else { Write-Host "Postgres portu (5432) erişilemedi." -ForegroundColor Yellow }
}
if ($redisInstalled) {
  Write-Host "Redis için port 6379 bekleniyor..."
  if (Wait-For-Port -port 6379 -timeoutSec 60) { Write-Host "Redis portu görünüyor." } else { Write-Host "Redis portu (6379) erişilemedi." -ForegroundColor Yellow }
}

# Ensure we have pnpm available
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "pnpm bulunamadı — corepack ile etkinleştirmeyi bir kez daha deneyeceğim..."
  try { corepack prepare pnpm@9.5.0 --activate } catch { Write-Host "pnpm etkinleştirme başarısız: $_" -ForegroundColor Yellow }
}

# Install dependencies
Write-Host "`n== Bağımlılıklar yükleniyor (pnpm install) =="
try {
  pnpm install
} catch {
  Write-Host "pnpm install başarısız: $_" -ForegroundColor Red
  Exit 1
}

# Copy .env.example to .env if missing
if (-not (Test-Path ".env") -and (Test-Path ".env.example")) {
  Write-Host " .env bulunamadı, .env.example kopyalanıyor -> .env"
  Copy-Item -Path ".env.example" -Destination ".env"
}

# Prisma generate / migrations if scripts exist
Write-Host "`n== Veritabanı işlemleri =="
try {
  pnpm db:migrate || Write-Host "db:migrate script'i başarısız veya bulunamadı."
} catch {
  Write-Host "db:migrate hatası: $_" -ForegroundColor Yellow
}
try {
  # If Prisma generate script exists in packages, run prisma generate where appropriate
  pnpm -r run typecheck --silent 2>$null
} catch {
  # ignore
}

# Build & start
Write-Host "`n== Proje derleniyor ve başlatılıyor =="
try {
  pnpm build
} catch {
  Write-Host "pnpm build başarısız (dev mod ile devam ediliyor): $_" -ForegroundColor Yellow
}
Write-Host "Geliştirme sunucuları başlatılıyor (pnpm dev)..."
try {
  pnpm dev
} catch {
  Write-Host "pnpm dev başarısız: $_" -ForegroundColor Red
  Exit 1
}