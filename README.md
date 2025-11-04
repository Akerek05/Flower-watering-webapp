Házi feladatként egy virág-locsoló alkalmazást fogok készíteni.
A felhasználó regisztráció vagy bejelentkezés után felveheti saját növényeit, megadhatja azok nevét, fajtáját, képét, és beállíthatja a locsolási gyakoriságot (például: 3 naponta, hetente stb.). Az alkalmazás figyeli az aktuális dátumot, és jelzi, mely növényeket kell aznap meglocsolni. A felhasználó bejelölheti, ha egy növényt már meglocsolt, ekkor a következő locsolási időpont automatikusan frissül.

A növények adatai Local Storage-ben tárolódnak, így az ablak bezárása után sem vesznek el. A növényekhez a felhasználó képet is tölthet fel, amelyet File API segítségével jelenít meg az alkalmazás.
A növények listája név vagy kategória (pl. „szobanövény”, „kültéri”) alapján kereshető és szűrhető.
Egy statisztikai nézet diagramon mutatja, hogy a növények milyen gyakran igényelnek locsolást (például: napi/heti/havi bontásban).


Az alkalmazás Material Design alapú, reszponzív felületet kap, ikonokkal és színkódokkal jelölve az aktuálisan locsolandó növényeket. A locsolási értesítésekhez Notification API is használható (ha a böngésző engedélyezi).