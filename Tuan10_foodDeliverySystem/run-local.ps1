$ErrorActionPreference = "Stop"

Write-Host "== Food Delivery System (Hybrid REST + Event) =="
Write-Host "Yeu cau: RabbitMQ dang chay tai 127.0.0.1:5672 (guest/guest)"
Write-Host ""

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$amqp = "amqp://guest:guest@127.0.0.1:5672"

function Start-ServiceInNewWindow($name, $path, $port, $extraEnv = @{}) {
  $full = Join-Path $root $path
  $envLines = @()
  $envLines += "`$env:PORT='$port';"
  foreach ($k in $extraEnv.Keys) {
    $envLines += "`$env:$k='$($extraEnv[$k])';"
  }
  $cmd = "cd `"$full`"; " + ($envLines -join " ") + " npm start"
  Start-Process powershell -ArgumentList "-NoExit", "-Command", $cmd -WindowStyle Normal | Out-Null
  Write-Host "Started $name on port $port"
}

Start-ServiceInNewWindow "User Service" "userService" 8081 @{ "DB_PATH" = (Join-Path $root "userService\\users.json") }
Start-ServiceInNewWindow "Food Service" "foodService" 8082 @{}
Start-ServiceInNewWindow "Order Service" "orderService" 8083 @{ "DB_PATH" = (Join-Path $root "orderService\\orders.json"); "AMQP_URL" = $amqp }
Start-ServiceInNewWindow "Payment Service" "paymentService" 8084 @{ "AMQP_URL" = $amqp }
Start-ServiceInNewWindow "Notification Service" "notificationService" 8085 @{ "AMQP_URL" = $amqp }

Start-ServiceInNewWindow "API Gateway" "apiGateway" 8080 @{
  "USER_BASE"  = "http://localhost:8081"
  "FOOD_BASE"  = "http://localhost:8082"
  "ORDER_BASE" = "http://localhost:8083"
}

$frontend = Join-Path $root "frontend"
$cmdFront = @"
cd `"$frontend`";
`$env:VITE_GATEWAY_BASE='http://localhost:8080';
npm run dev
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $cmdFront -WindowStyle Normal | Out-Null
Write-Host "Started Frontend on port 3000"
Write-Host ""
Write-Host "Open http://localhost:3000"

