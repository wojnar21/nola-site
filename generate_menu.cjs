const fs = require('fs');

const menuData = JSON.parse(fs.readFileSync('src/data/menu.json', 'utf8'));

const newCocktailItems = [
  {
    "category": "KOKTAJLE NA PROSECCO",
    "items": [
      {
        "name": "NOLA",
        "description": "Prosecco (90ml), Passoa (60ml), syrop waniliowy, sok z limonki ; 11,5% VOL.",
        "price": "34 PLN"
      },
      {
        "name": "APEROL SPRITZ",
        "description": "Prosecco (90ml), Aperol (60ml), woda gazowana, cząstka pomarańczy ; 9,2% VOL.",
        "price": "33 PLN"
      },
      {
        "name": "PROSECCO FRENCH 77",
        "description": "Prosecco (175ml), Gin Beefeater infuzowany miętą (40ml), syrop z kwiatów czarnego bzu, sok z cytryny, cząstka limonki ; 11,9% VOL.",
        "price": "43 PLN"
      },
      {
        "name": "RASPBERRY LIME SPRITZ",
        "description": "Prosecco (175ml), sok z limonki, maliny, puree malinowe, cukier trzcinowy, mięta ; 7,5% VOL.",
        "price": "46 PLN"
      }
    ]
  },
  {
    "category": "KOKTAJLE",
    "items": [
      {
        "name": "WHISKY SOUR",
        "description": "Whisky Black Bottle (40ml), Angostura Bitters, sok z cytryny, cukier trzcinowy, autorska pianka z białka i angostury ; 16,1% VOL.",
        "price": "36 PLN"
      },
      {
        "name": "OLD FASHIONED",
        "description": "Whiskey Sazerac Rye (40ml), Angostura Bitters, cukier trzcinowy ; 27,2% VOL.",
        "price": "36 PLN"
      },
      {
        "name": "PIJANY ŁOWCA",
        "description": "Bourbon Wild Turkey 81 (40ml), Likier Jägermeister (20ml), Likier Campari (10ml), Angostura Orange, sok z cytryny, cukier trzcinowy ; 23,8% VOL.",
        "price": "40 PLN"
      },
      {
        "name": "MANHATTAN",
        "description": "Whiskey Sazerac Rye (60ml), Martini Rosso (30ml), Angostura Bitters ; 33,5% VOL.",
        "price": "46 PLN"
      },
      {
        "name": "PENICYLINA",
        "description": "Whisky Peat Monster (20ml), Bourbon Wild Turkey 81 (40ml), imbir, miód, cytryna ; 16,9% VOL.",
        "price": "49 PLN"
      },
      {
        "name": "LONG ISLAND ICE TEA",
        "description": "Tequila Jose Cuervo (20ml), Rum Flor de Cana 4yo (20ml), Wódka Ostoya (20ml), Gin Beefeater (20ml), Likier Cointreau (20ml), sok z cytryny, cukier trzcinowy, Coca-Cola ; 22% VOL.",
        "price": "46 PLN"
      },
      {
        "name": "PORNSTAR MARTINI",
        "description": "Wódka waniliowa (60ml), Passoa (20ml), Prosecco (40ml), likier Galliano Vanilla, świeża marakuja, puree z marakui, sok z ananasa, sok z limonki ; 17,3% VOL.",
        "price": "41 PLN"
      },
      {
        "name": "ESPRESSO MARTINI",
        "description": "Wódka Ostoya (40ml), Likier Kahlua (20ml), espresso doppio, cukier trzcinowy ; 13,7% VOL.",
        "price": "36 PLN"
      },
      {
        "name": "BITTER FRENCH",
        "description": "Gin Beefeater (30ml), Campari (10ml), Prosecco (60ml), sok z cytryny, cukier trzcinowy ; 16,2% VOL.",
        "price": "28 PLN"
      },
      {
        "name": "CLOVER CLUB",
        "description": "Gin Beefeater Pink (40ml), puree malinowe, białko, sok z cytryny, cukier trzcinowy ; 12,3% VOL.",
        "price": "31 PLN"
      },
      {
        "name": "NEGRONI",
        "description": "Gin Beefeater (30ml), Likier Campari (30ml), Vermouth 9 di Dante Inferno (30ml) ; 27,5% VOL.",
        "price": "41 PLN"
      },
      {
        "name": "ELDERFLOWER COLLINS",
        "description": "Gin Beefeater (60ml), syrop z czarnego bzu, sok z cytryny, sok z limonki, cukier trzcinowy, woda gazowana ; 16% VOL.",
        "price": "31 PLN"
      },
      {
        "name": "MARGARITA",
        "description": "Tequila Jose Cuervo (40ml), Likier Cointreau (20ml), sok z limonki, syrop z agawy ; 23,2% VOL.",
        "price": "36 PLN"
      },
      {
        "name": "CARIBBEAN",
        "description": "Rum Flor de Cana 7yo (40ml), syrop kokosowy, sok z pomarańczy, sok z cytryny, sok z limonki ; 14,5% VOL.",
        "price": "28 PLN"
      },
      {
        "name": "PINEAPPLE & BLACK PEPPER DAIQUIRI",
        "description": "Rum Flor de Cana 7yo (60ml), syrop ananasowy, pieprz, sok z limonki ; 20,9% VOL.",
        "price": "35 PLN"
      },
      {
        "name": "MOJITO",
        "description": "Rum Flor de Cana 4yo (40ml), limonka, mięta, woda gazowana, cukier trzcinowy ; 16% VOL.",
        "price": "33 PLN"
      },
      {
        "name": "PINACOLADA",
        "description": "Rum Flor de Cana 4yo (40ml), Malibu (20ml), sok ananasowy, mleko kokosowe, syrop kokosowy ; 8,2% VOL.",
        "price": "34 PLN"
      }
    ]
  },
  {
    "category": "KOKTAJLE PREMIUM",
    "items": [
      {
        "name": "SMOKED OLD FASHIONED",
        "description": "Rum Dictador 20yo (40ml), Angostura Bitters, cukier trzcinowy, woda gazowana, podany z dymem z cygara ; 24,6% VOL.",
        "price": "62 PLN"
      },
      {
        "name": "OLD CUBAN",
        "description": "Rum Don Papa Masskara (40ml), Prosecco (30ml), Angostura Bitters, cukier trzcinowy, sok z limonki, mięta ; 17,4% VOL.",
        "price": "59 PLN"
      },
      {
        "name": "VELVET EMBER",
        "description": "Bourbon Woodford Reserve (50ml), wino czerwone (10ml), Angostura Bitters, syrop z orzecha włoskiego, syrop klonowy ; 28,8% VOL.",
        "price": "54 PLN"
      },
      {
        "name": "MIDNIGHT MAGNOLIA",
        "description": "Whiskey Jack Daniel's Single Barrel (50ml), vermouth infuzowany hibiskusem (20ml), likier porzeczkowy, Angostura Orange ; 34,3% VOL.",
        "price": "68 PLN"
      },
      {
        "name": "HIGHLAND NOIR",
        "description": "Whisky Glendronach 12yo (50ml), Kahlua (10ml), Angostura Cocoa, syrop z czarnej porzeczki ; 36,1% VOL.",
        "price": "71 PLN"
      },
      {
        "name": "GOLDEN AGAVE REVERIE",
        "description": "Tequila Herradura Reposado (50ml), puree z mango, syrop z chilli, sok z limonki, białko wegańskie ; 19% VOL.",
        "price": "62 PLN"
      },
      {
        "name": "AVIATION",
        "description": "Gin Hendrick's Grand Cabaret (60ml), likier Creme De Violette, likier Luxardo, sok z limonki ; 29,4% VOL.",
        "price": "69 PLN"
      },
      {
        "name": "MEDITERRANEAN SILK",
        "description": "Gin Mare (50ml), biały wytrawny vermouth (20ml), kordiał ogórkowy, bazylia, sól ; 29,4% VOL.",
        "price": "54 PLN"
      }
    ]
  },
  {
    "category": "MOKTAJLE",
    "items": [
      {
        "name": "PORNSTAR MARTINI 0%",
        "description": "Prosecco 0% (40ml), puree z marakui, białko, syrop waniliowy, sok z cytryny, sok z limonki",
        "price": "32 PLN"
      },
      {
        "name": "GREEN REFRESHER",
        "description": "Gin Gordon's 0% (40ml), sok jabłkowy, cukier trzcinowy, limonka, ogórek, napar z klitori",
        "price": "28 PLN"
      },
      {
        "name": "GORDON'S GIMLET",
        "description": "Gin Gordon’s 0% (40ml), napar z herbaty, cukier trzcinowy, cytryna",
        "price": "26 PLN"
      },
      {
        "name": "MARTINI VIBRANTE SPRITZ",
        "description": "Martini Vibrante 0% (80ml), tonic, cząstka pomarańczy",
        "price": "32 PLN"
      },
      {
        "name": "VIRGIN MOJITO",
        "description": "Limonka, mięta, woda gazowana, cukier trzcinowy",
        "price": "24 PLN"
      },
      {
        "name": "VIRGIN PINACOLADA",
        "description": "Sok ananasowy, mleko kokosowe, syrop kokosowy",
        "price": "26 PLN"
      }
    ]
  },
  {
    "category": "WINA MUSUJĄCE",
    "items": [
      { "name": "SCUDO ORO' PROSECCO TREVISO BRUT", "description": "Włochy / Veneto / Glera ; 11,50% VOL.", "price": "750 ml 126 PLN / 100 ml 21 PLN" },
      { "name": "VILLA BELLUCCI ALCOHOL FREE", "description": "Włochy / Veneto / Glera", "price": "750 ml 90 PLN / 100 ml 15 PLN" },
      { "name": "PARES BALTA CAVA BRUT", "description": "Hiszpania / Katalonia / Parellada, Macabeo, Xarello ; 11% VOL.", "price": "149 PLN" },
      { "name": "GOSSET EXCELLENCE EXTRA BRUT", "description": "Francja / Szampania / Pinot Noir, Chardonnay, Pinot Meunier ; 12% VOL.", "price": "354 PLN" },
      { "name": "DOM PERIGNON VINTAGE BRUT", "description": "Francja / Szampania / Pinot Noir, Chardonnay ; 12,50% VOL.", "price": "1 829 PLN" }
    ]
  },
  {
    "category": "WINA BIAŁE",
    "items": [
      { "name": "DOMAINE GAYDA", "description": "Francja / Langwedocja / Viognier ; 13% VOL.", "price": "750 ml 120 PLN / 125 ml 24 PLN" },
      { "name": "MARLBOROUGH SUN", "description": "Nowa Zelandia / Marlborough / Sauvignon Blanc ; 12,50% VOL.", "price": "750 ml 145 PLN / 125 ml 29 PLN" },
      { "name": "UBY SAUVIGNON ZERO ALCOHOL", "description": "Francja / Południowy Zachód / Sauvignon Blanc", "price": "750 ml 110 PLN / 125 ml 22 PLN" },
      { "name": "TORRE DE LAPELA VINHO VERDE", "description": "Portugalia / Vinho Verde / Alvarinho, Trajadura ; 12% VOL.", "price": "104 PLN" },
      { "name": "KENDERMANNS RIESLING KABINETT", "description": "Niemcy / Hesja Nadreńska / Riesling ; 8% VOL.", "price": "109 PLN" },
      { "name": "K-NAIA", "description": "Hiszpania / Rueda / Verdejo, Sauvignon Blanc ; 13% VOL.", "price": "124 PLN" },
      { "name": "MASI MASIANCO", "description": "Włochy / Veneto / Pinot Grigio, Verduzzo ; 13% VOL.", "price": "158 PLN" },
      { "name": "1924 BUTTERY CHARDONNAY", "description": "USA / Kalifornia / Chardonnay ; 14% VOL.", "price": "187 PLN" },
      { "name": "LAGAR DE CERVERA ALBARINO", "description": "Hiszpania / Galicja / Albarino ; 13% VOL.", "price": "189 PLN" },
      { "name": "FAMILLE HUGEL RIESLING CLASSIC", "description": "Francja / Alzacja / Riesling ; 12% VOL.", "price": "227 PLN" },
      { "name": "DOMAINE DE LA ROSSIGNOLE SANCERRE", "description": "Francja / Dolina Loary / Sauvignon Blanc ; 14,50% VOL.", "price": "229 PLN" },
      { "name": "DOMAINE FEVRE CHABLIS", "description": "Francja / Chablis / Chardonnay ; 12,50% VOL.", "price": "239 PLN" }
    ]
  },
  {
    "category": "WINA CZERWONE",
    "items": [
      { "name": "ZENSA PRIMITIVO ORGANIC IGP", "description": "Włochy / Apulia / Primitivo ; 13,50% VOL.", "price": "750 ml 130 PLN / 125 ml 26 PLN" },
      { "name": "LA LINDA OLD VINES MALBEC", "description": "Argentyna / Mendoza / Malbec ; 14,20% VOL.", "price": "750 ml 145 PLN / 125 ml 29 PLN" },
      { "name": "WOODHAVEN CABERNET SAUVIGNON", "description": "USA / California / Cabernet Sauvignon ; 13% VOL.", "price": "109 PLN" },
      { "name": "SANTA CAROLINA GRAN RESERVA CARMENERE", "description": "Chile / Rapel Valley / Carmenere ; 14,50% VOL.", "price": "152 PLN" },
      { "name": "TOMBACCO PRIMITIVO DI MANDURIA", "description": "Włochy / Apulia / Primitivo ; 15% VOL.", "price": "168 PLN" },
      { "name": "MASI BONACOSTA VALPOLICELLA CLASSICO", "description": "Włochy / Veneto / Corvina, Rondinella, Molinara ; 12% VOL.", "price": "164 PLN" },
      { "name": "KINGS OF PROHIBITION SHIRAZ", "description": "Australia / Barossa Valley / Shiraz ; 14% VOL.", "price": "179 PLN" },
      { "name": "BARON DE LEY RESERVA", "description": "Hiszpania / Rioja / Tempranillo ; 13,50% VOL.", "price": "185 PLN" },
      { "name": "TORRE DE GOLBAN CRIANZA", "description": "Hiszpania / Ribera Del Duero / Tempranillo ; 14,20% VOL.", "price": "195 PLN" },
      { "name": "LUIGI BOSCA DE SANGRE MALBEC EDICION LIMITADA", "description": "Argentyna / Mendoza / Malbec ; 14,50% VOL.", "price": "245 PLN" },
      { "name": "JOSEPH DROUHIN RULLY ROUGE", "description": "Francja / Burgundia / Pinot Noir ; 13% VOL.", "price": "249 PLN" },
      { "name": "MASI COSTASERA AMARONE DELLA VALPOLICELLA CLASSICO D.O.C.", "description": "Włochy / Veneto / Corvina, Rondinella, Molinara ; 15% VOL.", "price": "429 PLN" }
    ]
  },
  {
    "category": "SZKOCJA WHISKY SINGLE MALT (Speyside)",
    "items": [
      { "name": "ABERLOUR 12YO", "description": "40% VOL.", "price": "20 ml 22 PLN / 40 ml 44 PLN" },
      { "name": "ABERLOUR 16YO", "description": "43% VOL.", "price": "20 ml 37 PLN / 40 ml 74 PLN" },
      { "name": "BALVENIE 12YO DOUBLEWOOD", "description": "40% VOL.", "price": "20 ml 26 PLN / 40 ml 52 PLN" },
      { "name": "BALVENIE 21YO PORT WOOD", "description": "40% VOL.", "price": "20 ml 100 PLN / 40 ml 199 PLN" },
      { "name": "BALVENIE 25YO RARE MARRIAGE", "description": "48% VOL.", "price": "20 ml 262 PLN / 40 ml 524 PLN" },
      { "name": "GLENFIDDICH 12YO", "description": "40% VOL.", "price": "20 ml 18 PLN / 40 ml 36 PLN" },
      { "name": "GLENFIDDICH 15YO", "description": "40% VOL.", "price": "20 ml 25 PLN / 40 ml 50 PLN" },
      { "name": "GLENFIDDICH 18YO", "description": "40% VOL.", "price": "20 ml 42 PLN / 40 ml 84 PLN" },
      { "name": "GLENFIDDICH 21YO", "description": "40% VOL.", "price": "20 ml 89 PLN / 40 ml 178 PLN" },
      { "name": "GLENFIDDICH 23YO", "description": "40% VOL.", "price": "20 ml 144 PLN / 40 ml 288 PLN" },
      { "name": "GLENFIDDICH 26YO", "description": "43,80% VOL.", "price": "20 ml 264 PLN / 40 ml 528 PLN" },
      { "name": "GLENLIVET 12YO", "description": "40% VOL.", "price": "20 ml 15 PLN / 40 ml 30 PLN" },
      { "name": "GLENLIVET 15YO", "description": "40% VOL.", "price": "20 ml 27 PLN / 40 ml 54 PLN" },
      { "name": "MACALLAN 12YO", "description": "40% VOL.", "price": "20 ml 31 PLN / 40 ml 62 PLN" },
      { "name": "MACALLAN 15YO", "description": "43% VOL.", "price": "20 ml 57 PLN / 40 ml 114 PLN" }
    ]
  },
  {
    "category": "SZKOCJA WHISKY SINGLE MALT (Highlands)",
    "items": [
      { "name": "ANCNOC 12YO", "description": "40% VOL.", "price": "20 ml 19 PLN / 40 ml 38 PLN" },
      { "name": "ANCNOC 18YO", "description": "46% VOL.", "price": "20 ml 49 PLN / 40 ml 98 PLN" },
      { "name": "BALBLAIR 15YO", "description": "46% VOL.", "price": "20 ml 43 PLN / 40 ml 86 PLN" },
      { "name": "CLYNELISH 14YO", "description": "46% VOL.", "price": "20 ml 25 PLN / 40 ml 50 PLN" },
      { "name": "DEANSTON 18YO", "description": "46,30% VOL.", "price": "20 ml 51 PLN / 40 ml 102 PLN" },
      { "name": "EDRADOUR 10 YO", "description": "40% VOL.", "price": "20 ml 22 PLN / 40 ml 44 PLN" },
      { "name": "EDRADOUR 12 CALEDONIA", "description": "46% VOL.", "price": "20 ml 33 PLN / 40 ml 66 PLN" },
      { "name": "GLENDRONACH 12YO", "description": "43% VOL.", "price": "20 ml 23 PLN / 40 ml 46 PLN" },
      { "name": "GLENGOYNE 15YO", "description": "43% VOL.", "price": "20 ml 42 PLN / 40 ml 84 PLN" },
      { "name": "GLENMORANGIE 12YO", "description": "40% VOL.", "price": "20 ml 19 PLN / 40 ml 38 PLN" },
      { "name": "GLENMORANGIE 15YO LASANTA", "description": "43% VOL.", "price": "20 ml 32 PLN / 40 ml 64 PLN" },
      { "name": "GLENMORANGIE 14YO QUINTA RUBAN", "description": "46% VOL.", "price": "20 ml 33 PLN / 40 ml 66 PLN" },
      { "name": "OLD PULTENEY 15YO", "description": "46% VOL.", "price": "20 ml 35 PLN / 40 ml 70 PLN" }
    ]
  },
  {
    "category": "SZKOCJA WHISKY SINGLE MALT (Campbeltown & Wyspy)",
    "items": [
      { "name": "GLEN SCOTIA 15YO", "description": "46% VOL.", "price": "20 ml 34 PLN / 40 ml 68 PLN" },
      { "name": "KILKERRAN 12YO", "description": "46% VOL.", "price": "20 ml 28 PLN / 40 ml 56 PLN" },
      { "name": "LONGROW PEATED", "description": "46% VOL.", "price": "20 ml 26 PLN / 40 ml 52 PLN" },
      { "name": "ARRAN 10YO", "description": "46% VOL.", "price": "20 ml 18 PLN / 40 ml 36 PLN" },
      { "name": "HIGHLAND PARK 12YO", "description": "40% VOL.", "price": "20 ml 19 PLN / 40 ml 38 PLN" },
      { "name": "LEDAIG 10YO", "description": "46,30% VOL.", "price": "20 ml 22 PLN / 40 ml 44 PLN" },
      { "name": "LEDAIG 18YO", "description": "46,30% VOL.", "price": "20 ml 59 PLN / 40 ml 118 PLN" },
      { "name": "RAASAY", "description": "46,40% VOL.", "price": "20 ml 26 PLN / 40 ml 52 PLN" },
      { "name": "TALISKER 10YO", "description": "45,80% VOL.", "price": "20 ml 19 PLN / 40 ml 38 PLN" },
      { "name": "TOBERMORY 12YO", "description": "46,30% VOL.", "price": "20 ml 22 PLN / 40 ml 44 PLN" },
      { "name": "TORABHAIG", "description": "46% VOL.", "price": "20 ml 21 PLN / 40 ml 42 PLN" }
    ]
  },
  {
    "category": "SZKOCJA WHISKY SINGLE MALT (Islay)",
    "items": [
      { "name": "ARDBEG 10YO", "description": "46% VOL.", "price": "20 ml 25 PLN / 40 ml 50 PLN" },
      { "name": "ARDBEG UIGEADAIL", "description": "54,20% VOL.", "price": "20 ml 40 PLN / 40 ml 80 PLN" },
      { "name": "BRUICHLADDICH PORT CHARLOTTE 10YO", "description": "50% VOL.", "price": "20 ml 26 PLN / 40 ml 52 PLN" },
      { "name": "BUNNAHABHAIN 12YO CASK STRENGTH", "description": "60,10% VOL.", "price": "20 ml 42 PLN / 40 ml 84 PLN" },
      { "name": "BUNNAHABHAIN 18YO", "description": "46,30% VOL.", "price": "20 ml 68 PLN / 40 ml 136 PLN" },
      { "name": "CAOIL ILA 12YO", "description": "43% VOL.", "price": "20 ml 23 PLN / 40 ml 46 PLN" },
      { "name": "LAGAVULIN 16YO", "description": "43% VOL.", "price": "20 ml 42 PLN / 40 ml 84 PLN" },
      { "name": "LAPHROAIG 10YO", "description": "40% VOL.", "price": "20 ml 26 PLN / 40 ml 52 PLN" }
    ]
  },
  {
    "category": "SZKOCJA WHISKY BLENDED",
    "items": [
      { "name": "BALLANTINES 12YO", "description": "40% VOL.", "price": "24 PLN" },
      { "name": "BLACK BOTTLE", "description": "40% VOL.", "price": "24 PLN" },
      { "name": "CHIVAS REGAL 12YO", "description": "40% VOL.", "price": "24 PLN" },
      { "name": "CHIVAS REGAL 18YO", "description": "40% VOL.", "price": "56 PLN" },
      { "name": "JOHNNIE WALKER BLACK LABEL", "description": "40% VOL.", "price": "26 PLN" }
    ]
  },
  {
    "category": "IRLANDIA WHISKEY",
    "items": [
      { "name": "BUSHMILLS 10YO", "description": "Single Malt ; 40% VOL.", "price": "28 PLN" },
      { "name": "BUSHMILLS 16YO", "description": "Single Malt ; 40% VOL.", "price": "48 PLN" },
      { "name": "BUSHMILLS 21YO", "description": "Single Malt ; 40% VOL.", "price": "136 PLN" },
      { "name": "REDBREAST 12YO", "description": "Single Malt ; 40% VOL.", "price": "48 PLN" },
      { "name": "REDBREAST 15YO", "description": "Single Malt ; 46% VOL.", "price": "82 PLN" },
      { "name": "JAMESON", "description": "Blended ; 40% VOL.", "price": "22 PLN" },
      { "name": "TULLAMORE DEW 12YO", "description": "Blended ; 40% VOL.", "price": "32 PLN" }
    ]
  },
  {
    "category": "WHISKY RESZTA ŚWIATA",
    "items": [
      { "name": "HIBIKI HARMONY / JAPONIA", "description": "43% VOL.", "price": "128 PLN" },
      { "name": "KAVALAN VINHO BARRIQUE / TAJWAN", "description": "56,30% VOL.", "price": "158 PLN" },
      { "name": "MIYAGIKYO / JAPONIA", "description": "45% VOL.", "price": "56 PLN" },
      { "name": "NIKKA FROM THE BARREL / JAPONIA", "description": "51,40% VOL.", "price": "50 PLN" },
      { "name": "YOICHI / JAPONIA", "description": "45% VOL.", "price": "56 PLN" }
    ]
  },
  {
    "category": "USA – BOURBON / RYE",
    "items": [
      { "name": "BUFFALO TRACE", "description": "40% VOL.", "price": "22 PLN" },
      { "name": "EAGLE RARE", "description": "45% VOL.", "price": "44 PLN" },
      { "name": "ELIJAH CRAIG SMALL BATCH", "description": "47% VOL.", "price": "30 PLN" },
      { "name": "JACK DANIELS", "description": "40% VOL.", "price": "22 PLN" },
      { "name": "JACK DANIEL'S GENTLEMAN JACK", "description": "40% VOL.", "price": "30 PLN" },
      { "name": "JACK DANIELS SINGLE BARREL", "description": "45% VOL.", "price": "48 PLN" },
      { "name": "MICHTER'S TOASTED BARREL", "description": "55,10% VOL.", "price": "88 PLN" },
      { "name": "WILD TURKEY 81", "description": "40,50% VOL.", "price": "22 PLN" },
      { "name": "WILD TURKEY RARE BREED", "description": "58,40% VOL.", "price": "38 PLN" },
      { "name": "WOODFORD RESERVE", "description": "43,20% VOL.", "price": "34 PLN" },
      { "name": "WOODFORD RESERVE RYE", "description": "45,20% VOL.", "price": "38 PLN" },
      { "name": "WOODFORD RESERVE DOUBLE OAKED", "description": "43,20% VOL.", "price": "46 PLN" }
    ]
  },
  {
    "category": "RUMY",
    "items": [
      { "name": "BOTUCAL RESERVA EXCLUSIVA", "description": "40% VOL.", "price": "36 PLN" },
      { "name": "BUMBU ORIGINAL", "description": "40% VOL.", "price": "28 PLN" },
      { "name": "COMPANIERO PANAMA", "description": "54% VOL.", "price": "38 PLN" },
      { "name": "CRISTOBAL NINA", "description": "40% VOL.", "price": "34 PLN" },
      { "name": "DICTADOR 12YO", "description": "40% VOL.", "price": "34 PLN" },
      { "name": "DICTADOR 20YO", "description": "40% VOL.", "price": "48 PLN" },
      { "name": "DON PAPA BAROKO", "description": "40% VOL.", "price": "38 PLN" },
      { "name": "DON PAPA MASSKARA", "description": "40% VOL.", "price": "42 PLN" },
      { "name": "FLOR DE CANA 18YO", "description": "40% VOL.", "price": "36 PLN" },
      { "name": "HAMPDEN 8YO", "description": "46% VOL.", "price": "66 PLN" },
      { "name": "WORTHY PARK RESERVE", "description": "45% VOL.", "price": "48 PLN" },
      { "name": "WORTHY PARK POLAND EDITION", "description": "63% VOL.", "price": "92 PLN" },
      { "name": "ZACAPA 23YO", "description": "43% VOL.", "price": "58 PLN" }
    ]
  },
  {
    "category": "KONIAKI I BRANDY",
    "items": [
      { "name": "HENNESSY VS", "description": "40% VOL.", "price": "34 PLN" },
      { "name": "HENNESY VSOP", "description": "40% VOL.", "price": "54 PLN" },
      { "name": "MARTEL VSOP", "description": "40% VOL.", "price": "44 PLN" },
      { "name": "REMY MARTIN VSOP", "description": "40% VOL.", "price": "56 PLN" },
      { "name": "REMY MARTIN XO", "description": "40% VOL.", "price": "166 PLN" },
      { "name": "METAXA 7*", "description": "40% VOL.", "price": "22 PLN" },
      { "name": "METAXA 12*", "description": "40% VOL.", "price": "32 PLN" }
    ]
  },
  {
    "category": "TEQUILA I GINY",
    "items": [
      { "name": "HERRADURA ANEJO", "description": "40% VOL.", "price": "48 PLN" },
      { "name": "JOSE CUERVO BLANCO", "description": "38% VOL.", "price": "22 PLN" },
      { "name": "1800 SILVER", "description": "38% VOL.", "price": "24 PLN" },
      { "name": "DON JULIO BLANCO", "description": "38% VOL.", "price": "42 PLN" },
      { "name": "PATRON ANEJO", "description": "40% VOL.", "price": "54 PLN" },
      { "name": "BEEFEATER", "description": "40% VOL.", "price": "18 PLN" },
      { "name": "HENDRICK'S", "description": "41,40% VOL.", "price": "32 PLN" },
      { "name": "HENDRICK'S GRAND CABARET", "description": "43,40% VOL.", "price": "34 PLN" },
      { "name": "GIN MARE CAPRI", "description": "42,70% VOL.", "price": "36 PLN" },
      { "name": "MONKEY 47", "description": "47% VOL.", "price": "38 PLN" }
    ]
  },
  {
    "category": "WÓDKI I INNE",
    "items": [
      { "name": "CHOPIN BLACK", "description": "40% VOL.", "price": "30 PLN" },
      { "name": "OSTOYA", "description": "40% VOL.", "price": "16 PLN" },
      { "name": "GREY GOOSE", "description": "40% VOL.", "price": "34 PLN" },
      { "name": "BAILEYS", "description": "17% VOL.", "price": "18 PLN" },
      { "name": "CHARTREUSE GREEN", "description": "55% VOL.", "price": "38 PLN" },
      { "name": "COINTREAU", "description": "40% VOL.", "price": "22 PLN" },
      { "name": "JAEGERMEISTER", "description": "35% VOL.", "price": "18 PLN" },
      { "name": "KAHLUA", "description": "16% VOL.", "price": "18 PLN" }
    ]
  },
  {
    "category": "PIWA",
    "items": [
      { "name": "ŻYWIEC BECZKOWE", "description": "5,50% VOL.", "price": "0,5L 18 PLN / 0,3L 15 PLN" },
      { "name": "ŻYWIEC BIAŁE PSZENICZNE", "description": "Butelkowe ; 4,90% VOL.", "price": "0,5L 18 PLN" },
      { "name": "ŻYWIEC IPA", "description": "Butelkowe ; 5,00% VOL.", "price": "0,5L 19 PLN" },
      { "name": "ŻYWIEC 0%", "description": "Butelkowe ; 0% VOL.", "price": "0,5L 18 PLN" },
      { "name": "ŻYWIEC BIAŁE 0%", "description": "Butelkowe ; 0% VOL.", "price": "0,5L 18 PLN" }
    ]
  }
];

const existingCocktails = menuData.cocktails || [];

const nonAlcoholicCategories = existingCocktails.filter(c => 
  c.category.includes('KAWY') || 
  c.category.includes('HERBATY') || 
  c.category.includes('ZIMNE NAPOJE') || 
  c.category.includes('DODATKI')
);

menuData.cocktails = [...newCocktailItems, ...nonAlcoholicCategories];

fs.writeFileSync('src/data/menu.json', JSON.stringify(menuData, null, 2));

console.log('Done!');
