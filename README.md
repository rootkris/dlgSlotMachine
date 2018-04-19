# Game Idea Bandit

Hoian kõige uuemat versiooni üleval: www.mrsalong.ee/dlg

## Mida on vaja veel teha(koodis):

1) Andmebaasid ja ühendus mänguga - Info andmebaasidest loetakse siis mängu laadimise ajal sisse ja hoitakse vahemälus, et peaks
võimalikult vähe koguaeg andmebaasiga ühenduses olema.

2) Parandada veidike kiiruse arvutamist - hetkel ei käitu päris nii nagu vaja. Ja võibolla peaks järjest seisma jääma mitte suvaliselt?

3) Koodi saab mõnes kohas optimeerida ja kokku tõmmata, seda teeb hiljem.

4) CSS kujundus vead mõnes kohas(ei tea miks see rolli nuppu praegu seal on kus ta on :D)

## Kuidas failid paigutatud on:

Kõik andmebaasiga seonduv on db_handler kaustas. Ainuke mis seal ümber tuleb teha on andmebaasi ligipääsu info sügavamale peitmisega, et seda nii lihtsalt kätte ei saaks keegi võõras

Kõik "mängumootoriga" seonduv on kaustas gamejs. Kuna sellega tegelen enamjaolt mina siis seda väga puutuda ei ole vaja.

Kõik muu lehega seonduv on webjs kaustas. Sinna saab lisada mis iganes lisa funktsioone, info nupud jne.
