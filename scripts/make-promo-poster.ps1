Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$textPath = Join-Path $PSScriptRoot "poster-text.json"
$t = Get-Content $textPath -Encoding UTF8 -Raw | ConvertFrom-Json
$qrPath = "D:\xwechat_files\wxid_xrzpqyxl9sih22_0d11\temp\RWTemp\2026-04\92b64adf8d7d54445cd510c4cb2cc36d\28b22c5e796ff00db5651f9cea8758ee.png"
$heroPath = Join-Path $root "public\assets\box-poster.png"
$outPath = Join-Path $root "public\assets\400box-promo-qr-poster.png"

function Brush($hex) { [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($hex)) }
function Pen($hex, $width) { [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml($hex), $width) }
function Font($size, $style) {
  foreach ($family in @("Microsoft YaHei UI", "Microsoft YaHei", "SimHei", "Arial")) {
    try { return [System.Drawing.Font]::new($family, $size, $style, [System.Drawing.GraphicsUnit]::Pixel) } catch {}
  }
  [System.Drawing.Font]::new([System.Drawing.FontFamily]::GenericSansSerif, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function PathRound($x, $y, $w, $h, $r) {
  $p = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  $p
}

function FillRound($g, $x, $y, $w, $h, $r, $b) {
  $p = PathRound $x $y $w $h $r
  $g.FillPath($b, $p)
  $p.Dispose()
}

function StrokeRound($g, $x, $y, $w, $h, $r, $pencolor, $width) {
  $p = PathRound $x $y $w $h $r
  $pen = Pen $pencolor $width
  $g.DrawPath($pen, $p)
  $pen.Dispose()
  $p.Dispose()
}

function CenterText($g, $text, $font, $brush, $x, $y, $w, $h) {
  $fmt = [System.Drawing.StringFormat]::new()
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $fmt)
  $fmt.Dispose()
}

function TextBox($g, $text, $font, $brush, $x, $y, $w, $h) {
  $fmt = [System.Drawing.StringFormat]::new()
  $fmt.Trimming = [System.Drawing.StringTrimming]::Word
  $g.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $fmt)
  $fmt.Dispose()
}

$bmp = [System.Drawing.Bitmap]::new(1080, 1920)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$yellow = Brush "#FFD21A"; $black = Brush "#101010"; $white = Brush "#FFFFFF"; $cream = Brush "#FFF9E8"; $green = Brush "#103A35"; $muted = Brush "#4D4D4D"
$g.FillRectangle($yellow, 0, 0, 1080, 1920)
for ($x = -250; $x -lt 1080; $x += 58) {
  $p = Pen "#E9B900" 4
  $g.DrawLine($p, $x, 0, $x + 420, 1920)
  $p.Dispose()
}

FillRound $g 70 42 430 62 31 $black
CenterText $g $t.topTag (Font 32 ([System.Drawing.FontStyle]::Bold)) $white 70 42 430 62
FillRound $g 762 38 240 86 32 $white
StrokeRound $g 762 38 240 86 32 "#101010" 7
CenterText $g $t.year (Font 52 ([System.Drawing.FontStyle]::Bold)) $black 762 38 240 86

$g.DrawString($t.title, (Font 96 ([System.Drawing.FontStyle]::Bold)), $black, 66, 138)
$g.DrawString($t.subtitle, (Font 42 ([System.Drawing.FontStyle]::Bold)), $black, 122, 256)

FillRound $g 70 350 940 84 16 $black
CenterText $g $t.community (Font 36 ([System.Drawing.FontStyle]::Bold)) $yellow 70 350 940 84

FillRound $g 70 474 445 245 30 $cream
StrokeRound $g 70 474 445 245 30 "#101010" 6
FillRound $g 565 474 445 245 30 $cream
StrokeRound $g 565 474 445 245 30 "#101010" 6
$g.DrawString($t.cardOneTitle, (Font 52 ([System.Drawing.FontStyle]::Bold)), $black, 112, 520)
$g.DrawString($t.cardOneSub, (Font 31 ([System.Drawing.FontStyle]::Bold)), $black, 116, 592)
$g.DrawString($t.cardTwoTitle, (Font 52 ([System.Drawing.FontStyle]::Bold)), $black, 610, 520)
$g.DrawString($t.cardTwoSub, (Font 29 ([System.Drawing.FontStyle]::Bold)), $black, 610, 592)

FillRound $g 70 765 940 86 10 $black
CenterText $g $t.activityTitle (Font 50 ([System.Drawing.FontStyle]::Bold)) $white 70 765 940 86

FillRound $g 70 895 450 260 26 $cream
StrokeRound $g 70 895 450 260 26 "#101010" 5
FillRound $g 560 895 450 260 26 $cream
StrokeRound $g 560 895 450 260 26 "#101010" 5
FillRound $g 92 866 194 54 27 $black
CenterText $g $t.priceOne (Font 29 ([System.Drawing.FontStyle]::Bold)) $white 92 866 194 54
FillRound $g 784 866 194 54 27 $black
CenterText $g $t.priceTwo (Font 29 ([System.Drawing.FontStyle]::Bold)) $white 784 866 194 54
$g.DrawString($t.eventOne, (Font 49 ([System.Drawing.FontStyle]::Bold)), $black, 106, 925)
TextBox $g $t.eventOneDesc (Font 28 ([System.Drawing.FontStyle]::Regular)) $muted 106 1000 360 110
$g.DrawString($t.eventTwo, (Font 49 ([System.Drawing.FontStyle]::Bold)), $black, 596, 925)
TextBox $g $t.eventTwoDesc (Font 28 ([System.Drawing.FontStyle]::Regular)) $muted 596 1000 360 110

$hero = [System.Drawing.Image]::FromFile($heroPath)
$src = [System.Drawing.Rectangle]::new(0, 260, $hero.Width, [Math]::Min(920, $hero.Height - 260))
$dst = [System.Drawing.Rectangle]::new(0, 1204, 1080, 390)
$g.DrawImage($hero, $dst, $src, [System.Drawing.GraphicsUnit]::Pixel)
$shade = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(150, 0, 0, 0))
$g.FillRectangle($shade, $dst)
FillRound $g 96 1234 520 90 12 $black
CenterText $g $t.giftTitle (Font 52 ([System.Drawing.FontStyle]::Bold)) $white 96 1234 520 90
$g.DrawString($t.giftLine, (Font 76 ([System.Drawing.FontStyle]::Bold)), $white, 96, 1350)
$g.DrawString($t.giftItems, (Font 31 ([System.Drawing.FontStyle]::Bold)), $white, 96, 1446)

$g.FillRectangle($green, 0, 1594, 1080, 326)
$g.DrawString($t.cta, (Font 58 ([System.Drawing.FontStyle]::Bold)), $white, 70, 1614)
TextBox $g $t.ctaDesc (Font 30 ([System.Drawing.FontStyle]::Regular)) $white 72 1688 570 100
$g.DrawString($t.url, (Font 28 ([System.Drawing.FontStyle]::Bold)), $yellow, 72, 1810)

FillRound $g 744 1618 282 264 20 $white
$qr = [System.Drawing.Image]::FromFile($qrPath)
$g.DrawImage($qr, [System.Drawing.Rectangle]::new(778, 1632, 214, 214))
CenterText $g $t.qrTip (Font 24 ([System.Drawing.FontStyle]::Bold)) $black 744 1850 282 28

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$qr.Dispose(); $hero.Dispose(); $g.Dispose(); $bmp.Dispose()
Write-Output $outPath
