/* Flag to globally allow SUSPICIOUS transaction. Would be helpful when AF is off so that we can just set this flag to false since no one will review Real Time Queue */
var ALLOW_SUSPICIOUS_TRANSACTION = abTestingHelper.getVariation(entityId, 'ABUSE_DETECTION_ALLOW_SUSPICIOUS_TRANSACTION', '1') == '1';  
var day = dateHelper.getDay("+07");
var hour = dateHelper.getHour("+07");

var qrisLimitValidationMappingByMcc = {
    '5111': { 'trxLimit': '500000' },
    '5137': { 'trxLimit': '2500000' },
    '5139': { 'trxLimit': '2500000' },
    '5192': { 'trxLimit': '5000000' },
    '5200': { 'trxLimit': '5000000' },
    '5251': { 'trxLimit': '5000000' },
    '5311': { 'trxLimit': '2500000' },
    '5331': { 'trxLimit': '1000000' },
    '5333': { 'trxLimit': '1000000' },
    '5399': { 'trxLimit': '500000' },
    '5411': { 'trxLimit': '1000000' },
    '5422': { 'trxLimit': '1000000' },
    '5441': { 'trxLimit': '1000000' },
    '5451': { 'trxLimit': '1000000' },
    '5462': { 'trxLimit': '1000000' },
    '5499': { 'trxLimit': '500000' },
    '5531': { 'trxLimit': '5000000' },
    '5532': { 'trxLimit': '5000000' },
    '5533': { 'trxLimit': '5000000' },
    '5541': { 'trxLimit': '5000000' },
    '5611': { 'trxLimit': '2500000' },
    '5621': { 'trxLimit': '2500000' },
    '5631': { 'trxLimit': '2500000' },
    '5641': { 'trxLimit': '2500000' },
    '5651': { 'trxLimit': '2500000' },
    '5655': { 'trxLimit': '2500000' },
    '5661': { 'trxLimit': '2500000' },
    '5691': { 'trxLimit': '2500000' },
    '5699': { 'trxLimit': '500000' },
    '5712': { 'trxLimit': '10000000' },
    '5719': { 'trxLimit': '2500000' },
    '5722': { 'trxLimit': '5000000' },
    '5732': { 'trxLimit': '10000000' },
    '5812': { 'trxLimit': '1000000' },
    '5814': { 'trxLimit': '500000' },
    '5941': { 'trxLimit': '2500000' },
    '5942': { 'trxLimit': '500000' },
    '5943': { 'trxLimit': '5000000' },
    '5945': { 'trxLimit': '5000000' },
    '5946': { 'trxLimit': '5000000' },
    '5977': { 'trxLimit': '5000000' },
    '5995': { 'trxLimit': '1000000' },
    '7032': { 'trxLimit': '5000000' },
    '7832': { 'trxLimit': '500000' },
    '7833': { 'trxLimit': '500000' },
    '7933': { 'trxLimit': '1000000' },
    '7992': { 'trxLimit': '5000000' },
    '7997': { 'trxLimit': '5000000' },
    '8043': { 'trxLimit': '5000000' },
    '8044': { 'trxLimit': '5000000' },
    '8062': { 'trxLimit': '2500000' },
    '8071': { 'trxLimit': '2500000' },
    '8099': { 'trxLimit': '1000000' },
    '1234': { 'trxLimit': '1000000' }
  };
    
  var qrisMerchantCategoryCode = qrisInformation['qrisMerchant']['mcc'];
  
  if (qrisMerchantCategoryCode != null) {
    if (!blacklistHelper.isWhitelistedByNamespaceV2('merchant-category-codes', 'qris-bayarind', 'merchantCategoryCode', qrisMerchantCategoryCode)) {
      return "REJECT;Qris mcc is not whitelisted;QrisNotAllowed";
    }
    
    var dailyMerchantLimit = qrisInformation['qrisMerchant']['dailyMerchantLimit'];
    var cumulativeDailyTransactionAmount = qrisInformation['qrisMerchant']['cumulativeDailyTransactionAmount'];
    if (dailyMerchantLimit != null && cumulativeDailyTransactionAmount != null) {
      if ((cumulativeDailyTransactionAmount + transactionAmount) > dailyMerchantLimit) {
        return "REJECT;Cumulative daily transaction amount > daily merchant limit;QrisDailyMerchantLimit";
      }
    }
    
    var mccTransactionLimit = qrisLimitValidationMappingByMcc[qrisMerchantCategoryCode]["trxLimit"];
    if(mccTransactionLimit != null && transactionAmount > mccTransactionLimit) {
      return "REJECT;Transaction amount > mcc transaction limit;QrisMccTransactionLimit";
    }
  }
  
  if (stringUtils.contains(merchantName, 'EV7 SEVEN')) {
      return "BLOCK;EV 7 Merchant Blacklisted;BlacklistedSeller"
  }
  
  if ((masterUserId == null || masterUserId == '') && (userId != null || userId != '')) {

      masterUserId = userId

  }
  
  var whitelistedResults = blacklistHelper.getWhitelists([
    {"type": 'emails', "namespace": 'demoOjk', "searchField": {"email": userEmail.toLowerCase()}},
    {"type": 'phones', "namespace": 'employee', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'phones', "namespace": 'special-person', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'users', "namespace": 'cross-contract-cash-to-bnpl', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'cross-contract-cash-to-bnpl-auto', "searchField": {"userId": masterUserId}},
    {"type": 'phones', "namespace": 'production-tester-user', "searchField": {"phoneNumber": userPhoneNumber}}
  ]);
  
  var blacklistedResults = blacklistHelper.getBlacklists([
    {"type": 'users', "namespace": 'account-takeover', "searchField": {"userId": userId}},
    {"type": 'phones', "namespace": 'external-blacklists', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'phones', "namespace": 'external-blacklists', "searchField": {"phoneNumber": buyerPhoneNumber}},
    {"type": 'phones', "namespace": 'phones', "searchField": {"phoneNumber": shippingPhoneNumber}},
    {"type": 'phones', "namespace": 'phones', "searchField": {"phoneNumber": billingPhoneNumber}},
    {"type": 'phones', "namespace": 'promo-abuse', "searchField": {"phoneNumber": userPhoneNumber}}
  ]);

  var is_silverlist = (blacklistHelper.isWhitelistedBulkCheck('users', 'cross-contract-cash-to-bnpl', {'userId': masterUserId}, whitelistedResults) || blacklistHelper.isWhitelistedBulkCheck('users', 'cross-contract-cash-to-bnpl-auto', {"userId": masterUserId}, whitelistedResults))
  
  //comment out for SQA to skip go to fraud review
  /*if ((day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
    if (blacklistHelper.isWhitelistedBulkCheck('emails', 'demoOjk', { "email": userEmail.toLowerCase() }, whitelistedResults)) {
      return "SUSPICIOUS;User Email is Whitelisted on Namespace demoOjk;DemoOjk;Testing";
    }
  }*/
  
  if (blacklistHelper.isBlacklistedBulkCheck('users', 'account-takeover', { "userId": userId }, blacklistedResults)) {
      return 'BLOCK;Account Takeover Case';
  }
  
  if ((blacklistHelper.isWhitelistedBulkCheck('phones', 'employee', { "phoneNumber": userPhoneNumber }, whitelistedResults))||(userEmail.toLowerCase() == 'akoesnan@gmail.com')||(userEmail.toLowerCase() == 'aldoliputo@gmail.com')) {
    return "NORMAL;Whitelisted Internal Employee;WhitelistedUser";
  }
  
  if (
      ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") || (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME"))
      && blacklistHelper.isWhitelistedBulkCheck('phones', 'special-person', { "phoneNumber": userPhoneNumber }, whitelistedResults)
      ) {
      return "NORMAL;Whitelisted Special Person;WhitelistedUser";
  }
  
  if (maxCurrentDpdFromAllCla > 3) {
      return 'BLOCK;User have current late outstanding in other CLA;BlacklistedUser';
  }
  
  if (
      blacklistHelper.isBlacklistedBulkCheck('phones', 'external-blacklists', { "phoneNumber": userPhoneNumber }, blacklistedResults) ||
      blacklistHelper.isBlacklistedBulkCheck('phones', 'external-blacklists', { "phoneNumber": buyerPhoneNumber }, blacklistedResults)
  ) {
      return "BLOCK;Phone Number Blacklisted on Namespace external-blacklists;BlacklistedUser";
  }
  
  if (
      blacklistHelper.isBlacklistedBulkCheck('phones', 'phones', { "phoneNumber": shippingPhoneNumber }, blacklistedResults) ||
      blacklistHelper.isBlacklistedBulkCheck('phones', 'phones', { "phoneNumber": billingPhoneNumber }, blacklistedResults)
  ) {
      return "BLOCK;Billing or Shipping Phone Number Blacklisted;BlacklistedUser";
  }
  
  
  /* BLACKLISTING TRANSACTION LOCATION*/

var transaction_location = featureScoresByFeatureName['transaction_location'] == null ? '-999' : featureScoresByFeatureName['transaction_location']; 


var is_blacklisted_location = false;
var blacklist_result = '';
var blacklistReason = '';


if ((transaction_location != '') && (transaction_location != '-999')){
	blacklist_result = blacklistedLocationHelper.validateLocation(transaction_location);
	is_blacklisted_location = (blacklist_result['isBlacklisted'] == null) ? false:blacklist_result['isBlacklisted'];
	blacklistReason = (blacklist_result['blacklistReason'] == null) ? '':blacklist_result['blacklistReason'];

	if (is_blacklisted_location){
		 return "BLOCK;Blackisted Location;FraudLocation"; 
        
	}
}
  
  var BLIBLI_JEWEL_WHITELIST = [
      "BUT-70113",	 /*Bunga Tanjung Official Store*/
      "J5O-70000",	 /*UMKM J5ISMOYO */
      "AYD-70035",	 /*Ayugold Official Store*/
      "BEJ-70108",	 /*Belva  Jewellery Official Store*/
      "ADJ-60024",	 /*Adelle Jewellery Official Store*/
      "JOP-70103",	 /*Jofeanshop*/
      "PRJ-70063",	 /*Princess Jewellery Store Official Store*/
      "LIO-18086",	 /*Lino & Sons Official Store*/
      "JUJ-70037",	 /*Juene Jewelry Official Store*/
      "THP-60025",	 /*The Palace Official Store*/
      "TOM-70074",	 /*Toko mas Bintang Mas Semarang*/
      "DIC-70184",	 /*Diamond & Co Official Store  */
      "MOM-70130",	 /*Model Manis*/
      "SUG-70052",	 /*Sunnies Gallery*/
      "DIP-70200",	 /*Diamond Pavilion*/
      "ISO-70036",	 /*Isago Official Store*/
      "PED-70092",	 /*PEONIA DIAMOND BY SWAN JEWEL*/
      "PAJ-70075",	 /*PASSION JEWELRY Official Store*/
      "POJ-60023",	 /*POSH JEWELLERY Official Store*/
      "BED-70148"	 /*Beliberlian.id*/
  ];

  var BLIBLI_INSTORE_WHITELIST = [
      "BEO-60044",
      "BSS-70006",
      "KAC-60021",
      /*"FAC-60035", -- removed 12 Dec 2024, high risk*/
      "HAP-60072",
      /*"ISB-70024", -- removed 07 Jul 2025, gestun high risk */
      "LIP-60076",
      "SPA-60023",
      "LUC-70058",
      "JOC-60042",
      "TOS-60030",
      "SUR-70095",
      "GAP-70108",
      "SUA-60106",
      /*"SIM-46522", -- removed 26 June 2025, high risk */
      "CIH-60023",
      "NAT-52177",
      "MUC-70090",
      "GLM-60022",
      "RRF-70004",
      "VEP-60029",
      "KUC-70005",
      "VEJ-70002",
      "MAC-70061",
      "LIP-70058",
      "KLS-60025",
      "CIO-60021",
      "JAP-70055",
      "BOG-70037",
      "POB-51173",
      "BEM-70075",
      "PRL-70013",
      "THW-70006", /* ADDED 27 SEP 2024 */
      "OPS-60041",
      "SLC-60022",
      "SLC-60021",
      "SEO-60045",
      "KIK-60029",
      "DAS-60076",
      "DRE-60025",
      "ROO-60036",
      "BLS-70056",
      "BLM-70244",
      "HEO-70120",
      "TUT-70043",
      "PTB-60157",
      /* "OKP-70027", removed, bad stores, offline fraud Feb 2025*/ 
      "OPS-70007",
      "FOS-48348",
      "FOS-48029",
      "FES-70178",
      "FEM-70025",
      "TOO-60072",
      "DIP-60078",
      "DIS-70328",
      "GAM-60100",
      /*"SEP-33984", removed, bad store gestun */
      "SEP-50242",
      "POB-51173",
      "RAS-39632",
      "SES-60041",
      "CIO-60021",
      "HUS-70092",
      "CEY-60021",
      "APG-60025",
      "HAS-60061",
      "TOL-54940",
      "SIM-60047",
      "PTT-56876",
      /*"TEG-42036", removed, bad stores gestun, Rio don't like*/
      "ATC-52167",
      "SMM-70006",
      "PEC-60028",
      "COR-70000",
      "SAS-60088",
      "SAS-60190",
      "SIM-60048",
      "DOO-17607",
      "SOC-48541",
      "SOC-60032",
      "FON-52582",
      "DJO-60024",
      "AGI-70038",
      "BUN-60026",
      "ITG-17865",
      "KLS-60025",
      "INB-44886",
      "UFE-27255",
      "UFE-70014",
      "BOP-70148",
      "BOP-70149",
      "BOG-70073",
      "BOB-70103",
      "BOP-70150",
      "BOJ-70045",
      "BOM-70095",
      "BOT-70078",
      "BOC-70052",
      "BOP-70100",
      "BOP-70116",
      "BOM-70098",
      "BOP-70151",
      "BOL-70087",
      "URS-70020",
      "ADJ-70045",
      "OGA-60001",
      "TEI-49779",
      "KIT-10831",
      "ZAP-60033",
      "ZAP-60036",
      "MEB-60064",
      "PIR-70008",
      "PIR-70021",
      "PIR-70023",
      "PIR-70026",
      "PIR-70031",
      "PIR-70036",
      "PIR-70039",
      "PIR-70041",
      "PIR-70042",
      "ESG-70001",
      "ESP-70024",
      "ESM-70008",
      "ESS-70030",
      "ESP-70023",
      "ESS-70029",
      "EUS-70012",
      "EUP-70003",
      "EUG-70004",
      "EUO-70003",
      "EUM-70002",
      "EUP-70004",
      "EUS-70013",
      "EUS-70014",
      "PLE-70035",
      "PLS-70063",
      "PLD-70020",
      "PLK-70011",
      "PLT-70037",
      "EFB-60021",
      "EFB-60022",
      "EFB-60023",
      "EFC-60021",
      "EFG-60021",
      "EFP-60021",
      "EFP-60022",
      "EFP-60023",
      "EFT-60021",
      "EFT-60022",
      "EFT-70003",
      "EFS-70027",
      "EFC-70006",
      "EFG-70011",
      "ENF-70004",
      "ENF-70006",
      "ENF-70003",
      "ENF-70008",
      "ENF-70001",
      "ENF-70002",
      "ENF-70007",
      "ENF-70028",
      "ENF-70005",
      "ENF-70029",
      "ENF-70031",
      "ENF-70038",
      "ENF-70036",
      "EFE-70003",
      "EFE-70004",
      "EFE-70005",
      "EFS-70021",
      "EFE-70015",
      "EFE-70016",
      "EFK-70001",
      "EFG-70009",
      "ENF-70034",
      "EFK-70004",
      "EFC-70007",
      "ENF-70035",
      "EFP-70001",
      "SIS-60086",
      "BBC-70020",
      "BBC-70021",
      "BBC-70006",
      "BBC-70011",
      "BBC-70013",
      "BBC-70014",
      "BBC-70015",
      "BBC-70010",
      "BBC-70016",
      "BBC-70009",
      "BBC-70017",
      "BBC-70022",
      "BBC-70024",
      "BBC-70025",
      "BBC-70035",
      "BBC-70036",
      "BBC-70039",
      "BBC-70051",
      "BBC-70053",
      "BBC-70054",
      "BBC-70056",
      "BBC-70059",
      "BBC-70065",
      "SKM-70015",
      "SKC-70017",
      "SKW-70003",
      "SKK-70009",
      "SKC-70019",
      "SKM-70016",
      "SKP-70024",
      "SKB-70020",
      "SKP-70023",
      "SKS-70045",
      "SKC-70039",
      "SKL-70023",
      "SKP-70040",
      "SKB-70026",
      "SKL-70025",
      "SKG-70016",
      "SKC-70020",
      "SKG-70012",
      "SKC-70034",
      "SKG-70019",
      "SKL-70029",
      "SKA-70040",
      "SKA-70045",
      "SKA-70039",
      "SKE-70057",
      "SKK-70020",
      "SKL-70036",
      "SKM-70031",
      "SKC-70049",
      "SKA-70031",
      "SKB-70042",
      "SKK-70021",
      "SKE-70064",
      "SKL-70033",
      "AVT-60023",
      "LII-60039",
      "ODO-70008",
      "ODO-70009",
      "ODO-70010",
      "ODO-70012",
      "ODO-70013",
      "ODO-70014",
      "ODO-70015",
      "ODO-70016",
      "ODO-70017",
      "ODO-70018",
      "ODO-70019",
      "ODO-70020",
      "ODO-70021",
      "ODO-70022",
      "ODO-70023",
      "ODO-70024",
      "ODO-70025",
      "ODO-70026",
      "ODO-70027",
      "ODO-70028",
      "ODO-70029",
      "ODO-70031",
      "ODO-70032",
      "ODO-70033",
      "ORK-70015",
      "ORA-70049",
      "ORP-60030",
      "ORP-60025",
      "ORB-60025",
      "WIS-70367",
      "OSG-70000",
      "OSG-70005",
      "OSG-70007",
      "OSG-70004",
      "OSG-70006",
      "OSG-70003",
      "OSG-70010",
      "OSG-70011",
      "OSG-70012",
      "OSG-70013",
      "OSG-70014",
      "OSG-70015",
      "OSG-70020",
      "OSG-70016",
      "OSG-70021",
      "OSG-70023",
      "OSC-70010",
      "OSG-70025",
      "OSG-70032",
      "OSG-70034",
      "OSG-70035",
      "OSG-70024",
      "KMJ-60021",
      "KMK-60021",
      "KMK-60022"      /* ADDED 6 NOV 2024 */
  ];
  
  var BLIBLI_INSTORE_WHITELIST_GI = [
      "TRO-60045",
      "BLH-60035",
      "NUO-70021",
      "BRI-70027",
      "DRF-70019",
      "AII-70040",
      "BRP-70118",
      "SAC-70080",
      "FLM-22188",
      "POE-60042",
      "ALA-70537",
      "LEI-70006",
      "AIO-60029",
      "TUB-70035",
      "CUH-70001",
      "TEO-60051",
      "KIP-60025",
      "RER-60023",
      "OFK-70007",
      "PTD-60032",
      "FEM-70026"
  ];

  var BLIBLI_GOOD_INSTORE_LIST = [
    'blibli store official store',
    'tukar tambah official store',
    'pt bijaksana komunikasi jakarta',
    'blibli monobrand official store',
    'oppostore',
    'tukar tambah akun lama',
    'hello official store',
    'blibli store instore',
    'ocean cellular',
    'aha store o2o',
    'it galeri #1 official store',
    'okeshop instore',
    'sinar abadi elektronik kotabumi'
  ];
  
  var FRAUD_ITEM_NAMES = [
      ' ovo ',
      'apa saja',
      'chip domino',
      'chip domino',
      'chip hig',
      'chip kuning',
      'chip md',
      'chip zaza',
      'domino higgs',
      'domino island',
      'domino md',
      'e voucher',
      'go pay',
      'gopay',
      'higgs domino',
      'higgs',
      'higs',
      'indodax',
      'isi saldo',
      'isi-saldo',
      'island md',
      'jasa kirim',
      'koin c',
      'logam mulia',
      'mahar unik',
      'md 1b',
      'top ap',
      'topap',
      'topup saldo',
      'usdt',
      'bisa top instan',
      'bisa-top instan'
  ];
  
  var FRAUD_ITEM_NAMES_ADD_CHECK = [
      'paket data',
      'voucher'
  ];
  
  var ALFAMART_LIST = [
      'ALFAMART',
      'Alfamart - Reguler',
      'Alfamart - Franchise',
      'ALFAMIDI - REGULER',
      'ALFAMIDI - FRANCHISE'
  ];
  
  var IPHONE_WHITELIST_ITEMS = [
      'iphone',
      'ios',
      'apple'
  ];
  
  var IPHONE_WHITELIST_STORES = [
      'Hello plus',
      'Hello +'
  ];
  
  var OFFLINE_WHITELIST_ITEMS = [ /*this list includes samsung for these editions only: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS*/
      'find n2 flip',
      'find n3 flip',
      'vivo x80',
      'find x5'
  ];
  
  var OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS = [
    'iphone 12',
    'iphone 13',
    'iphone 14',
    'iphone 15',
    'iphone 16',
    'iphone 17',
    'iphone 18',
    'ip 12',
    'ip 13',
    'ip 14',
    'ip 15',
    'ip 16',
    'ip 17',
    'ip 18',        
    'iphone12',
    'iphone13',
    'iphone14',
    'iphone15',
    'iphone16',
    'iphone17',
    'iphone18',        
    'apple 12',
    'apple 13',
    'apple 14',
    'apple 15',
    'apple 16',
    'apple 17',
    'apple 18',        
    'apple12',
    'apple13',
    'apple14',
    'apple15',
    'apple16',
    'apple17',
    'apple18',        
    'ipad',
    'macbook',
    'imac',
    'watch'
];

var OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS = [
    's21',
    's22',
    's23',
    's24',
    's25',
    's26',
    's27',       
    'z',
    'flip',
    'fold'
];
  
  var FSP_STORES = [
      'pt fokus solusi proteksi',
      'fsp - insurance broker',
      'cermati protect'
  ];
  
  var PRJ_STORES = [
      /*JAKARTA FAIR KEMAYORAN 2025*/
      '9to9 002 - exhibition jakarta fair kemayoran 2025',
      'advance 334 exhibition jakarta fair kemayoran 2025',
      'agres.id - agres.id & fone x intel exhibition jakarta fair kemayoran 2025',
      'agres.id - agres.id exhibition jakarta fair kemayoran 2025',
      'agres.id - agres.id gamer.id x amd exhibition jakarta fair kemayoran 2025',
      'belmont mattress 002 - belmont intertama perkasa exhibition jakarta fair kemayoran 2025',
      'best price elektronik indonesia 005 - bosh & beco exhibition jakarta fair kemayoran 2025',
      'best price elektronik indonesia 006 - shark ninja exhibition jakarta fair kemayoran 2025',
      'best price elektronik indonesia 007 - beko exhibition jakarta fair kemayoran 2025',
      'best price elektronik indonesia 008 - bosch exhibition jakarta fair kemayoran 2025',
      'best price elektronik indonesia 009 - hitachi exhibition jakarta fair kemayoran 2025',
      'buccheri 140 - exhibition jakarta fair kemayoran 2025',
      'delapan lapan sejahtera 002 - tailg exhibition jakarta fair kemayoran 2025',
      'delapan lapan sejahtera 003 - tailg motor listrik exhibition jakarta fair kemayoran 2025',
      'dimarco mitra utama 20 - exhibition jakarta fair kemayoran 2025',
      'dinamika indonusa prima 014 - airland exhibition jakarta fair kemayoran 2025',
      'ear 1201 - erafone exhibition jakarta fair kemayoran 2025',
      'electronic city 87 - exhibition jakarta fair kemayoran 2025',
      'gabino 80 - exhibition jakarta fair kemayoran 2025',
      'gan 25 - hello exhibition jakarta fair kemayoran 2025',
      'gio furniture 011 - alga exhibition jakarta fair kemayoran 2025',
      'gio furniture 012 - m flow & gadie exhibition jakarta fair kemayoran 2025',
      'gramedia 372 harapan indah',
      'gtn 284 - blibli exhibition jakarta fair kemayoran 2025',
      'gtn 289 - samsung blibli exhibition jakarta fair kemayoran 2025',
      'harmoni abadi mandiri 009 - dunlopillo exhibition jakarta fair kemayoran 2025',
      'ibox 197 - ibox exhibition jakarta fair kemayoran 2025',
      'indobuana auto raya e-motor 002 - exhibition jakarta fair kemayoran 2025',
      'inlife 05 - exhibition jakarta fair kemayoran 2025',
      'intex 24 - exhibition jakarta fair kemayoran 2025',
      'jmg international 057 - exhibition jakarta fair kemayoran 2025',
      'kiki motor persada 001 - volta motor listrik exhibition jakarta fair kemayoran 2025',
      'lady americana mattress 012 - cemerlang abadi mulya elite americana exhibition jakarta fair kemayoran 2025',
      'lady americana mattress 013 - cemerlang abadi mulya lady americana exhibition jakarta fair kemayoran 2025',
      'league 16 - gpn 1',
      'league 17 - gpn 3',
      'league 18 - hall b extention',
      'league 19 - hall c',
      'league 20 - hall a',
      'league 21 - pasar gambir barat patung budha',
      'league 21 - pasar gambir tower barat',
      'league 22 - hall b selasar',
      'league 23 - hall d dalam',
      'league 24 - hall open space',
      'league 25 - prj d luar',
      'league 26 - gpn 3 consignment',
      'lingkaran dua lestari 003 - ofero motor listrik exhibition jakarta fair kemayoran 2025',
      'lingkaran dua lestari 004 - ofero sepeda listrik exhibition jakarta fair kemayoran 2025',
      'logo 011 - gambir expo',
      'maka motor niaga 002 - exhibition jakarta fair kemayoran 2025',
      'master media 03 - exhibition jakarta fair kemayoran 2025',
      'matahari 185 - jakarta fair kemayoran',
      'mii urban republic 071 - urban republic exhibition jakarta fair kemayoran 2025',
      'nasa 177 - samsung exhibition jakarta fair kemayoran 2025',
      'neohaus 06 - neohaus exhibition jakarta fair kemayoran 2025',
      'optik melawai 378 - exhibition jakarta fair kemayoran 2025',
      'oriskin 81 - exhibition prj 2025',
      'oxxo sentral tekindo motor listrik 003 - yadea exhibition jakarta fair kemayoran 2025',
      'oxxo sentral tekindo sepeda listrik 002 - yadea exhibition jakarta fair kemayoran 2025',
      'pacific indah pratama 008 - exhibition jakarta fair kemayoran 2025',
      'perfect health 36 - exhibition jakarta fair kemayoran 2025',
      'pimbi corp indonesia 001 - nuv sepeda listrik exhibition jakarta fair kemayoran 2025',
      'polytron elektronik 05 - sarana kencana mulya exhibition jakarta fair kemayoran 2025',
      'polytron motor listrik 003 - sarana kencana mulya exhibition jakarta fair kemayoran 2025',
      'roda maju bahagia 005 - element exhibition jakarta fair kemayoran 2025',
      'romance grosir 018 - exhibition jakarta fair kemayoran 2025',
      'rovos 06 - exhibition jakarta fair kemayoran 2025',
      'saturdays 65 - exhibition jakarta fair kemayoran 2025',
      'scandia 025 - exhibition jakarta fair kemayoran 2025',
      'sentral komputer 019 - sentral komputer exhibition jakarta fair kemayoran 2025',
      'skin+ 68 exhibition jakarta lebaran fair 2025',
      'sleep center mkp 26 - massindo karya prima comforta exhibition jakarta fair kemayoran 2025',
      'sleep center mkp 27 - massindo karya prima therapedic exhibition jakarta fair kemayoran 2025',
      'sleep center mkp 28 - massindo karya prima spring air exhibition jakarta fair kemayoran 2025',
      'sunra retail indonesia 002 - sepeda listrik exhibition jakarta fair kemayoran 2025',
      'sunra retail indonesia 003 - motor listrik exhibition jakarta fair kemayoran 2025',
      'tokuyo 32 - exhibition jakarta fair kemayoran 2025',
      'ufo 35 - ufo exhibition jakarta fair kemayoran 2025',
      'ufo 36 - ufo tcl exhibition jakarta fair kemayoran 2025',
      'usaha lancar mandiri 005 - aqua exhibition jakarta fair kemayoran 2025',
      'usaha lancar mandiri 006 - sharp auvi exhibition jakarta fair kemayoran 2025',
      'usaha lancar mandiri 007 - lg exhibition jakarta fair kemayoran 2025',
      'vapebay 02 - tri distrindo abadi exhibition jakarta fair kemayoran 2025',
      'vivo store 43 - exhibition jakarta fair kemayoran 2025',
      'xiaohei teknologi indonesia 002 - saige motor listrik exhibition jakarta fair kemayoran 2025',
      'xiaohei teknologi indonesia sepeda listrik 001 - saige exhibition jakarta fair kemayoran 2025',
      'kawan lama azko 261 pameran mag a962',
      'ear 1202 - erafone x telkomsel exhibition jakarta fair kemayoran 2025',
      'eiger - jfk',
      'best price elektronik indonesia 010 - tefal exhibition jakarta fair kemayoran 2025',
      'perkasa makmur sejahtera 02 - florence exhibition jakarta fair kemayoran 2025',
      'perkasa makmur sejahtera 03 - olympic bed exhibition jakarta fair kemayoran 2025',
      'sumber digital media 01 - tanaka roomi exhibition jakarta fair kemayoran 2025',
      'duta abadi permata 01 - serta exhibition jakarta fair kemayoran 2025',
      'duta abadi permata 02 - tempur exhibition jakarta fair kemayoran 2025',
      'duta abadi permata 03 - ogawa exhibition jakarta fair kemayoran 2025'
    ];

    /*Cant Support using merchantId due to initialMerchantId is not available, therefore still using by name */
    var OFFLINE_DEKORUMA_STORES = [
        'project dekoruma'
      ];
  
  var PRJ_DUMMY_LIST = [
      'dummy exhibition jakarta fair kemayoran 2024 admin 1%',
      'dummy exhibition jakarta fair kemayoran 2024 admin 190k',
      'dummy sharp official store',
      'DUMMY SHARP OFFICIAL STORE',
      'DUMMY SHARP OFFICIAL STORE - SHARP EXHIBITION PET EXPO ICE BSD',
      'dummy sharp official store - sharp exhibition pet expo ice bsd',
      'dummy exhibition jakarta lebaran fair 2025'
  ];
  
  var MEDAN_FRAUD_APPLICATION = [
      'buccheri 110 - medan fair',
      'buccheri 28 - medan mall',
      'gabino 26 - gabino medan fair',
      'gabino 27 - gabino medan mall'
  ];
  
  var OTHERS_FRAUD_APPLICATION = [
      'optimum',
      'sriwijaya selular 03 - palembang square'
  ];
  
  var OFFLINE_RESTRICTED_ITEM = [
      'motor listrik'
  ];

  var MEDAN_FRAUD_TRX = [
      'ERASPACE',
      'GABINO 26 - GABINO MEDAN FAIR',
      'GABINO 27 - GABINO MEDAN MALL',
      'MATAHARI 553 - MEDAN THAMRIN',
      'MATAHARI 645 - MEDAN MALL',
      'BUCCHERI 110 - MEDAN FAIR',
      'BUCCHERI 28 - MEDAN MALL'
  ];
  
  var EBIKE_FRAUD_APPLICATION = [
      'auto ev 01 - auto ev rengasdengklok',
      'kelly bike'
  ];
  
  var EBIKE_FRAUD_TRX = [
      'auto ev 01 - auto ev rengasdengklok',
      'kelly bike'
  ];

  var MERCHANT_NON_GADGET = [
      'ERABLUE 43 - ERABLUE ELECTRONICS BOJONG GEDE',
      'EAR 622 - ERAFONE BOJONG GEDE',
      'BOJONG GEDE'
  ];

  var FRAUD_AGENT_LIST = [
    /*dup imei + fake handover*/
    '85b251b4-83b8-4f79-ad9c-d81a2c8a9357', /*septi puspitasari*/

    /*dup imei dc/andrean*/
    'd9f6d810-ec09-4b2f-85f6-4b9d1037f212', /*choirun nisa*/
    '50f23cdd-f4ef-4ce7-9d1c-9e4b85425fdd', /*dista ayu manjari*/
    
    /*fraud cempakamas*/
    '01230c90-a293-4987-9a33-ee1c351bc12a', /*arifin ilham*/
    '07d4f22c-cdf7-4db8-929b-f66f79ae197e', /*andeas sharul saputra zendrato*/
    '5fff6d0c-351b-4f06-973a-40b4fb8334e9', /*melisa pratiwi*/
    'd3db1cc1-40a8-4870-a4b9-6ef248bb6513', /*afni duskin halawa*/

    /*fraud bekasi*/
    '728183af-0be3-44eb-8403-37c7603f7c11', /*fariz bukhori*/
    '4923b6ff-cab9-4e89-b12c-7f53338cc740', /*devi oktavani*/
    '34ad00ea-c463-41c3-b7b8-fdedff86fb15', /*angga dermawan*/
    
    /*fraud bogor*/
    '877d05b4-0a0b-4802-b852-0d0c6e12ff82', /*muhamad rifqi ibrahim*/
    '6341efff-748d-444a-8d07-ff16dca2c490', /*siti aisah*/
    'a8580d35-2225-4865-ac34-175832d4a9f8', /*nadya permata putri budiyanto*/
    '97c2c64c-e32b-42e5-9d03-e3ad0b65d8d3', /*asri maulandari*/
    '1feff263-f645-4e0e-a8cf-9bdc55002f28', /*arham maulana r*/
    'ddef862e-f0e4-4d03-8cab-582e11982572', /*maradira suryawan*/
    '6d328da7-0e45-4d0d-8e72-1407fdb5069b',  /*setio nugraha*/

    /*fraud ITC Ambassador & Kuningan City*/
    'fafca8f7-498d-4a42-a30b-95b4d136e153', /*savira azahra*/
    '03b266ad-fda9-4091-8ba3-f4978c12555b', /*dita anggraeni*/

    /*fraud ITC Cempaka Mas*/
    '536efc46-d176-4495-b249-fbe334dc76b5', /*davia balqis*/

    /*fraud Karawang*/
    '00593716-cd6e-4386-b9a1-6a09b9ce048b', /*ayu livia rizkiana syahifa*/
    '3b1810eb-f2f1-4283-baec-f00f2c167bd8', /*sudir sutisna*/
    'af8599f6-20b0-4f5c-8966-c49e48750678', /*anggi yusup junaedi*/
    '69079e89-f1a2-4214-b76a-bc8ce0440486', /*wahyu aripin*/

    /*fraud login to customer account*/
    '1fc0552a-d91b-4e66-9688-c47b45206681', /*asep saepul*/
    'a1ec8f0d-1b9d-4704-a5db-16af5ac482bf'  /*husen*/
  ];  
  
  var XENDIT_WHITELIST_STORES = [
      'jagofon pte ltd',
      'xl prioritas',
      'xl axiata (myxl apps - produk prepaid)',
      'xl prioritas (myxl apps - produk postpaid)',
      'xl home / xl satu (myxl apps - produk xl home / xl satu)',
      'live validation test t4',
      'refocus',
      'dbklik',

      /*updated by irvin*/
      'pt cipta medika informasi',
      'pt selalu bahagia sejahtera',

      'xl prepaid',
      'xl prioritas', 
      'xl home', 

      'axis',
      'bodypack',
      'fithub',
      'renos',
      'urban icon',
      'fossil',
      'nav',
      'gym zone',
      '910',
      'tomoro',
      'lovise sofa',
      'tiptip',
      'fjallraven',
      'keen',
      'outside',
      'bbo',
      'kelas.work',
      'lg',
      'fitnesswork',
      'urban atheletes',
      'josephjoseph',
      'bizgital'
  ];

var XENDIT_WHITELIST_STORES_2 = [
    'xl'
  ];

  var QR_MERCHANT_ONE_MIO = [
    'artha jaya supermarket bangunan',
    'vapebay',
    'luxe ignite watch',
    'buana lestari sentosa'
  ];

  var QR_MERCHANT_TWO_MIO = [
    'sony center',
    'sukses kolaborasi surabaya',
    'sukses kolaborasi jogja',
    'sukses kolaborasi bali',
    'doss makassar',
    'doss camera & gadget',
    'vanilla convenient store',
    'rumah mahardika karsya',
    'alaska mandiri cemerlang',
    'lestari maju perkasa',
    'mii urban republic',
    'cellular world',
    'celullar world',
    'indo group',
    'cahaya rumah furniture',
    'doran gadget',
    'dunia bangunan bsd',
    'suriatama mahkota kencana',
    'ciputat jaya furniture'
  ];

  var good_merchant_online = [
    'NICEPAY - ZALORA',
    'BELANJA DI ZALORA',
    'BELANJA DI AGODA',
    'BELANJA DI TRAVELOKA',
    'BELANJA DI TRIP.COM',
    'CITILINK',
    'FASPAY - LOKET.COM',
    'GARUDA INDONESIA',
    'KLIK INDOMARET',
    'SOCIOLLA ONLINE',
    'RUPARUPA'
  ]

  var sanitizedItemNames = itemNames.replaceAll("_", " ");
  var lowerCaseItemNames = sanitizedItemNames.toLowerCase();
  
  var decision = '';
  
  var creditLimitMaxDpd = creditLimitMaxDpd == null ? -99 : creditLimitMaxDpd;
  var creditLimitAccountMaxDpd = creditLimitAccountMaxDpd == null ? -99 : creditLimitAccountMaxDpd;
  var userRescoringScore = userRescoringScore == null ? -99 : userRescoringScore;
  
  /* scoringFeature */
  /* numeric */
  var blibli_score = scoringFeature['blibli_score'] == null ? -99 : scoringFeature['blibli_score'];
  var tiket_score = scoringFeature['tiket_score'] == null ? -99 : scoringFeature['tiket_score'];
  var izi_max_multi_inquiries_14d = scoringFeature['izi_max_multi_inquiries_14d'] == null ? -99 : scoringFeature['izi_max_multi_inquiries_14d'];
  var avg_amount_disbursed_total = scoringFeature['avg_amount_disbursed_total'] == null ? -99 : scoringFeature['avg_amount_disbursed_total'];
  var average_age_of_relationship = scoringFeature['average_age_of_relationship'] == null ? -99 : scoringFeature['average_age_of_relationship'];
  var discounted_sum_outstanding_late_1y = scoringFeature['discounted_sum_outstanding_late_1y'] == null ? -99 : scoringFeature['discounted_sum_outstanding_late_1y'];
  var app_list_score_pefindo_flag = scoringFeature['app_list_score_pefindo_flag'] == null ? -99 : scoringFeature['app_list_score_pefindo_flag'];
  var percentage_latest_dpd_15_1y = scoringFeature['percentage_latest_dpd_15_1y'] == null ? -99 : scoringFeature['percentage_latest_dpd_15_1y'];
  var percentage_max_dpd_15_1y = scoringFeature['percentage_max_dpd_15_1y'] == null ? -99 : scoringFeature['percentage_max_dpd_15_1y'];
  var percentage_latest_active_dpd_3 = scoringFeature['percentage_latest_active_dpd_3'] == null ? -99 : scoringFeature['percentage_latest_active_dpd_3'];
  var count_written_off_unique_creditor_2y = scoringFeature['count_written_off_unique_creditor_2y'] == null ? -99 : scoringFeature['count_written_off_unique_creditor_2y'];
  var count_written_off_unique_creditor = scoringFeature['count_written_off_unique_creditor'] == null ? -99 : scoringFeature['count_written_off_unique_creditor'];
  var percentage_latest_active_dpd_30 = scoringFeature['percentage_latest_active_dpd_30'] == null ? -99 : scoringFeature['percentage_latest_active_dpd_30'];
  var pefindo_discounted_sum_outstanding_late = scoringFeature['pefindo_discounted_sum_outstanding_late'] == null ? -99 : scoringFeature['pefindo_discounted_sum_outstanding_late'];
  var count_outstanding_amount_active_cc = scoringFeature['count_outstanding_amount_active_cc'] == null ? -99 : scoringFeature['count_outstanding_amount_active_cc'];
  var max_limit_active_cc = scoringFeature['max_limit_active_cc'] == null ? -99 : scoringFeature['max_limit_active_cc'];
  var sum_limit_active_cc = scoringFeature['sum_limit_active_cc'] == null ? -99 : scoringFeature['sum_limit_active_cc'];
  var sum_paylater_settled_1y = scoringFeature['sum_paylater_settled_1y'] == null ? -99 : scoringFeature['sum_paylater_settled_1y'];
  var sum_paylater_disbursed_1y = scoringFeature['sum_paylater_disbursed_1y'] == null ? -99 : scoringFeature['sum_paylater_disbursed_1y'];
  var days_from_active_credit_card_disbursement_date = scoringFeature['days_from_active_credit_card_disbursement_date'] == null ? -99 : scoringFeature['days_from_active_credit_card_disbursement_date'];
  var percentage_outstanding_credit_card_active = scoringFeature['percentage_outstanding_credit_card_active'] == null ? -99 : scoringFeature['percentage_outstanding_credit_card_active'];
  var number_of_installed_loan_apps_within_14days = scoringFeature['number_of_installed_loan_apps_within_14days'] == null ? -99 : scoringFeature['number_of_installed_loan_apps_within_14days'];
  var email_age_ever_name_match = scoringFeature['email_age_ever_name_match'] == null ? -999 : scoringFeature['email_age_ever_name_match'];
  var phone_age_ever_name_match = scoringFeature['phone_age_ever_name_match'] == null ? -999 : scoringFeature['phone_age_ever_name_match'];
  var hibp_name_match = scoringFeature['hibp_name_match'] == null ? -999 : scoringFeature['hibp_name_match'];
  var tiket_account_age_days = scoringFeature['tiket_account_age_days'] == null ? -99 : scoringFeature['tiket_account_age_days'];
  var number_of_related_previous_order_id = scoringFeature['number_of_related_previous_order_id'] == null ? -99 : scoringFeature['number_of_related_previous_order_id'];
  var max_partner_score = scoringFeature['max_partner_score'] == null ? -99 : scoringFeature['max_partner_score'];
  var offline_transaction_applied_amount = scoringFeature['offline_transaction_applied_amount'] == null ? -9999 : scoringFeature['offline_transaction_applied_amount'];
  var is_tokopedia = scoringFeature['is_tokopedia'] == null ? '-99' : scoringFeature['is_tokopedia'];
  
  /* string */
  var current_company_name = scoringFeature['current_company_name'] == null ? '-99' : scoringFeature['current_company_name'];
  var initial_store_name = scoringFeature['store_name'] == null ? '-99' : scoringFeature['store_name'];
  var offline_store_category = scoringFeature['offline_store_category'] == null ? '-99' : scoringFeature['offline_store_category'];
  var verified_izi_mobile_phone_whatsapp = scoringFeature['verified_izi_mobile_phone_whatsapp'] == null ? '-999' : scoringFeature['verified_izi_mobile_phone_whatsapp'];
  var match_ewallet_name_logic = scoringFeature['match_ewallet_name_logic'] == null ? '-999' : scoringFeature['match_ewallet_name_logic'];
  var izi_mobile_phone_number_ages = scoringFeature['izi_mobile_phone_number_ages'] == null ? '-999' : scoringFeature['izi_mobile_phone_number_ages'];
  var offline_item_names = scoringFeature['offline_item_names'] == null ? '-99' : scoringFeature['offline_item_names'];
  var offline_item_category = scoringFeature['offline_item_category'] == null ? '-99' : scoringFeature['offline_item_category'];
  var phone_model_class = scoringFeature['phone_model_class'] == null ? -99 : scoringFeature['phone_model_class'];
  var offline_sub_item_category = scoringFeature['offline_sub_item_category'] == null ? '-99' : scoringFeature['offline_sub_item_category'];
  var address_is_current_address = scoringFeature['address_is_current_address'] == null ? '-99' : scoringFeature['address_is_current_address'];
  var applicant_current_residence_city = scoringFeature['applicant_current_residence_city'] == null ? '-99' : scoringFeature['applicant_current_residence_city'];
  var applicant_residence_city = scoringFeature['applicant_residence_city'] == null ? '-99' : scoringFeature['applicant_residence_city'];

  /* featureScoresByFeatureName */
  var count_submit_app_within_4_hours_distinct = featureScoresByFeatureName['count_submit_app_within_4_hours_distinct'] == null ? -99 : featureScoresByFeatureName['count_submit_app_within_4_hours_distinct'];
  var day_latest_to_earliest_payment_date_last3y_before_trx = featureScoresByFeatureName['day_latest_to_earliest_payment_date_last3y_before_trx'] == null ? -99 : featureScoresByFeatureName['day_latest_to_earliest_payment_date_last3y_before_trx'];
  var count_unique_month_paid_before_trx = featureScoresByFeatureName['count_unique_month_paid_before_trx'] == null ? -99 : featureScoresByFeatureName['count_unique_month_paid_before_trx'];
  var max_diff_transaction_creation_to_submit = featureScoresByFeatureName['max_diff_transaction_creation_to_submit'] == null ? -99 : featureScoresByFeatureName['max_diff_transaction_creation_to_submit'];
  var count_approved_cash_loan = featureScoresByFeatureName['count_approved_cash_loan'] == null ? -99 : featureScoresByFeatureName['count_approved_cash_loan'];
  var count_finished_cash_loan = featureScoresByFeatureName['count_finished_cash_loan'] == null ? -99 : featureScoresByFeatureName['count_finished_cash_loan'];
  var item_group_risk = featureScoresByFeatureName['item_group_risk'] == null ? '-99' : featureScoresByFeatureName['item_group_risk'];
  var count_round_item_price = featureScoresByFeatureName['count_round_item_price'] == null ? -99 : featureScoresByFeatureName['count_round_item_price'];
  var shipping_purchase_ratio = featureScoresByFeatureName['shipping_purchase_ratio'] == null ? -99 : featureScoresByFeatureName['shipping_purchase_ratio'];
  var count_submit_cash_loan_application_30_days = featureScoresByFeatureName['count_submit_cash_loan_application_30_days'] == null ? -99 : featureScoresByFeatureName['count_submit_cash_loan_application_30_days'];
  var count_low_risk_facematch_score_1d = featureScoresByFeatureName['count_low_risk_facematch_score_1d'] == null ? -99 : featureScoresByFeatureName['count_low_risk_facematch_score_1d'];
  var count_reject_abusedet_last_30d = featureScoresByFeatureName['count_reject_abusedet_last_30d'] == null ? -9999 : featureScoresByFeatureName['count_reject_abusedet_last_30d'];
  var sum_pulsa_trx_3h = featureScoresByFeatureName['sum_pulsa_trx_3h'] == null ? -99 : featureScoresByFeatureName['sum_pulsa_trx_3h'];
  var sum_pln_trx_3h = featureScoresByFeatureName['sum_pln_trx_3h'] == null ? -99 : featureScoresByFeatureName['sum_pln_trx_3h'];
  var sum_pln_trx_6h = featureScoresByFeatureName['sum_pln_trx_6h'] == null ? -99 : featureScoresByFeatureName['sum_pln_trx_6h'];
  var days_since_last_trx = featureScoresByFeatureName['days_since_last_trx'] == null ? -99 : featureScoresByFeatureName['days_since_last_trx'];
  var count_installed_fraud_app_90d = featureScoresByFeatureName['count_installed_fraud_app_90d'] == null ? -99 : featureScoresByFeatureName['count_installed_fraud_app_90d'];
  var count_reject_cash_after_cli_submit_last_60d = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d'];
  var count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash'];
  var count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash'];
  var count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup'];
  var count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup'];
  var count_handphone_purchase_blibli = featureScoresByFeatureName['count_handphone_purchase_blibli'] == null ? -99 : featureScoresByFeatureName['count_handphone_purchase_blibli'];
  var is_va_same_phone_number = featureScoresByFeatureName['is_va_same_phone_number'] == null ? -99 : featureScoresByFeatureName['is_va_same_phone_number'];
  var count_motor_listrik_purchased_30d = featureScoresByFeatureName['count_motor_listrik_purchased_30d'] == null ? -99 : featureScoresByFeatureName['count_motor_listrik_purchased_30d'];
  var count_smartphone_purchased_30d = featureScoresByFeatureName['count_smartphone_purchased_30d'] == null ? -99 : featureScoresByFeatureName['count_smartphone_purchased_30d'];
  var count_prev_suspect_fraud = featureScoresByFeatureName['count_prev_suspect_fraud'] == null ? -99 : featureScoresByFeatureName['count_prev_suspect_fraud'];

  
  /* featureScoresByFeatureName - user activity*/
  var is_change_device_l30d = featureScoresByFeatureName['is_change_device_l30d'] == null ? '-99' : featureScoresByFeatureName['is_change_device_l30d'];
  var number_of_recaptured_l14d = featureScoresByFeatureName['number_of_recaptured_l14d'] == null ? -99 : featureScoresByFeatureName['number_of_recaptured_l14d'];
  var count_otp_sms_l3d = featureScoresByFeatureName['count_otp_sms_l3d'] == null ? -99 : featureScoresByFeatureName['count_otp_sms_l3d'];
  var count_verified_otp_sms_l3d = featureScoresByFeatureName['count_verified_otp_sms_l3d'] == null ? -99 : featureScoresByFeatureName['count_verified_otp_sms_l3d'];
  var number_of_recaptured_l3d_above_70_percent = featureScoresByFeatureName['number_of_recaptured_l3d_above_70_percent'] == null ? -99 : featureScoresByFeatureName['number_of_recaptured_l3d_above_70_percent'];
  var count_low_70_risk_facematch_score_14d = featureScoresByFeatureName['count_low_70_risk_facematch_score_14d'] == null ? -99 : featureScoresByFeatureName['count_low_70_risk_facematch_score_14d'];
  var sum_amount_l7d_inc_now = featureScoresByFeatureName['sum_amount_l7d_inc_now'] == null ? -99 : featureScoresByFeatureName['sum_amount_l7d_inc_now'];
  var day_diff_trx_to_last_cash_approve = featureScoresByFeatureName['day_diff_trx_to_last_cash_approve'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_approve'];
  var day_diff_trx_to_last_cash_submit = featureScoresByFeatureName['day_diff_trx_to_last_cash_submit'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_submit'];
  var day_diff_trx_to_last_cash_disburse = featureScoresByFeatureName['day_diff_trx_to_last_cash_disburse'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_disburse'];
  var latest_cash_approved_date_1y = featureScoresByFeatureName['latest_cash_approved_date_1y'] == null ? '-999' : featureScoresByFeatureName['latest_cash_approved_date_1y'];
  var latest_cash_rejected_date_1y = featureScoresByFeatureName['latest_cash_rejected_date_1y'] == null ? '-999' : featureScoresByFeatureName['latest_cash_rejected_date_1y'];
  var count_prev_trx_merchant = featureScoresByFeatureName['count_prev_trx_merchant'] == null ? -99 : featureScoresByFeatureName['count_prev_trx_merchant'];
  
  /* featureScoresByFeatureName - rescoring latest features*/
  var app_list_score_cli_rescore = featureScoresByFeatureName['app_list_score_cli_rescore'] == null ? -99 : featureScoresByFeatureName['app_list_score_cli_rescore'];
  var discounted_sum_outstanding_late1y_rescore = featureScoresByFeatureName['discounted_sum_outstanding_late1y_rescore'] == null ? -99 : featureScoresByFeatureName['discounted_sum_outstanding_late1y_rescore'];
  var average_age_of_relationship_rescore = featureScoresByFeatureName['average_age_of_relationship_rescore'] == null ? -99 : featureScoresByFeatureName['average_age_of_relationship_rescore'];
  var number_of_installed_loan_apps_within14days_rescore = featureScoresByFeatureName['number_of_installed_loan_apps_within14days_rescore'] == null ? -99 : featureScoresByFeatureName['number_of_installed_loan_apps_within14days_rescore'];
  var izi_max_multi_inquiries14d_rescore = featureScoresByFeatureName['izi_max_multi_inquiries14d_rescore'] == null ? -99 : featureScoresByFeatureName['izi_max_multi_inquiries14d_rescore'];
  var app_list_pefindo_flag_rescore = featureScoresByFeatureName['app_list_pefindo_flag_rescore'] == null ? -99 : featureScoresByFeatureName['app_list_pefindo_flag_rescore'];
  
  /* offlineFeatures */
  var cliMaxDpdLast30d = offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast30d'];
  var cliMaxDpdLast90d = offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast90d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast90d'];
  var store_count = size(offlineFeatures['blibliStoreLevelFeatures']);
  var sumAmountTenure1MonthLast30dBlibli = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dBlibli'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dBlibli'];
  var sumAmountTenure1MonthLast30dIndodana = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dIndodana'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dIndodana'];
  var sumAmountTenure1MonthLast30dTiket = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dTiket'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dTiket'];
  var isLimitEqualsLimitExposureBlibli = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureBlibli'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureBlibli'];
  var isLimitEqualsLimitExposureIndodana = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureIndodana'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureIndodana'];
  var isLimitEqualsLimitExposureTiket = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureTiket'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureTiket'];
  var blibliLimit = offlineFeatures['userTransactionHistoryFeatures']['blibliLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['blibliLimit'];
  var indodanaLimit = offlineFeatures['userTransactionHistoryFeatures']['indodanaLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['indodanaLimit'];
  var tiketLimit = offlineFeatures['userTransactionHistoryFeatures']['tiketLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['tiketLimit'];
  var riskGrade = offlineFeatures['userTransactionHistoryFeatures']['riskGrade'] == null ? '-99' : offlineFeatures['userTransactionHistoryFeatures']['riskGrade'];
  var riskGradeOfflineScore = offlineFeatures['userTransactionHistoryFeatures']['riskGradeOfflineScore'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['riskGradeOfflineScore'];
  var discounted_sum_outstanding_late_1y_latest = offlineFeatures['userTransactionHistoryFeatures']['discountedSumOutstandingLate1yLatest'] == null ? discounted_sum_outstanding_late_1y : offlineFeatures['userTransactionHistoryFeatures']['discountedSumOutstandingLate1yLatest'];
  var prevCliPaidInstallmentAvg = offlineFeatures['userTransactionHistoryFeatures']['prevCliPaidInstallmentAvg'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['prevCliPaidInstallmentAvg'];
  var prevCliOutstandingBalance = offlineFeatures['userTransactionHistoryFeatures']['prevCliOutstandingBalance'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['prevCliOutstandingBalance'];
  var countCashLoan1mFdcLatest = offlineFeatures['userTransactionHistoryFeatures']['countCashLoan1mFdcLatest'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countCashLoan1mFdcLatest'];
  var countCashLoan3mFdcLatest = offlineFeatures['userTransactionHistoryFeatures']['countCashLoan3mFdcLatest'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countCashLoan3mFdcLatest'];
  var cashMaxDpdLast30d = offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast30d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast30d'];
  var cashMaxDpdLast90d = offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast90d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast90d'];
  var countDistinctKtpDevice = offlineFeatures['userTransactionHistoryFeatures']['countDistinctKtpDevice'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countDistinctKtpDevice'];
  var sumAmountCancelledTrx30d = offlineFeatures['userTransactionHistoryFeatures']['sumAmountCancelledTrx30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountCancelledTrx30d'];
  var countRejectedCashNikLevelLast1y = offlineFeatures['userTransactionHistoryFeatures']['countRejectedCashNikLevelLast1y'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countRejectedCashNikLevelLast1y'];
  var fdcStatisticNumberOfInquiryId30d = offlineFeatures['userTransactionHistoryFeatures']['fdcStatisticNumberOfInquiryId30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['fdcStatisticNumberOfInquiryId30d'];
  var sumPaymentVaBeforeTrx = offlineFeatures['userTransactionHistoryFeatures']['sumPaymentVaBeforeTrx'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['sumPaymentVaBeforeTrx'];

  /* blibliStoreLevelFeatures */
  var ratioRoundItemPriceTrxAmt = size(offlineFeatures['blibliStoreLevelFeatures']) == 0 ? null : offlineFeatures['blibliStoreLevelFeatures'][0]['ratioRoundItemPriceTrxAmt'];
  var isOfficialStore = size(offlineFeatures['blibliStoreLevelFeatures']) == 0 ? null : offlineFeatures['blibliStoreLevelFeatures'][0]['isOfficialStore'];
  
  /* scrappedSellerInformation */
  var badges = size(scrappedSellerInformation) == 0 ? null : scrappedSellerInformation[0]['badges'];
  
  
  /* ----------- feature calculation ---------------------*/
  var amount_1mo_to_limit_ratio = 0;
  if ((tenure == 1)) {
      if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dBlibli + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
      } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dTiket + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
      } else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dIndodana + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
      }
  } else if ((tenure > 1)) {
      if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (blibliLimit > 0)) {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dBlibli * 1.00) / blibliLimit;
      } else if ((creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') && (tiketLimit > 0)) {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dTiket * 1.00) / tiketLimit;
      } else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' && (indodanaLimit > 0)) {
          amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dIndodana * 1.00) / indodanaLimit;
      }
  }
  
  var bucket_multipliers = '';
  var split_multiplier = '';
  var max_multiplier = 1;
  
  if ((creditLimitAccountCategoryType != null) && (!stringUtils.contains(creditLimitAccountCategoryType, 'NO_MULTIPLIER'))) {
      bucket_multipliers = stringUtils.split(creditLimitAccountCategoryType, '_');
      split_multiplier = bucket_multipliers[size(bucket_multipliers) - 1].toCharArray();
      max_multiplier = 1;
  
      for (m: split_multiplier) {
          if (toInteger(toString(m)) > max_multiplier) {
              max_multiplier = toInteger(toString(m));
          }
      }
  }
  
  var amount_1mo_to_limit_ratio_limit_equals_exposure_combined = '';
  if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
      if (
          ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
          || (isLimitEqualsLimitExposureBlibli == true)
      ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
      } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.3) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
      } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.5) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
      } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.9) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
      } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio >= 0.9) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
      }
  } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
      if (
          ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
          || (isLimitEqualsLimitExposureTiket == true)
      ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
      } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.3) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
      } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.5) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
      } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.9) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
      } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio >= 0.9) ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
      }
  } else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
      if (
          ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
          || (isLimitEqualsLimitExposureIndodana == true)
      ) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
      } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.3)) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
      } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.5)) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
      } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.9)) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
      } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio >= 0.9)) {
          amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
      }
  }
  
  var previous_purchases_merchants = '';
  for (merchant : countOfPurchaseByMerchant.keySet()) {
      previous_purchases_merchants = previous_purchases_merchants + merchant + ';'; 
  }
  
  var blibliStoreGroup = '';
  if (store_count == 1) {
      blibliStoreGroup = offlineFeatures['blibliStoreLevelFeatures'][0]['blibliStoreGroup'];
  }
  var store_name = '';
  for (store : storeNames) {
      store_name = store_name + store + ';'; 
  }
  
  var adjusted_limit_utilization = 1 - ((bucketizedCreditLimitAccountLimitBalance - (transactionAmount * 1.00)) / bucketizedCreditLimitAccountLimit);
  var count_active_cash_loan = count_approved_cash_loan - count_finished_cash_loan;
  
  var is_official_store_blibli = false;
  if (stringUtils.contains(store_name, 'Official Store') || stringUtils.contains(store_name, 'by Blibli')) {
      is_official_store_blibli = true;
  } 
  
  var is_whitelisted_iphone_item_temp_limit = false;
  for (item: IPHONE_WHITELIST_ITEMS) {
      if(stringUtils.contains(lowerCaseItemNames, item.toLowerCase())) {
          is_whitelisted_iphone_item_temp_limit = true;
      }    
  }
  
  var is_offline_origination = offline_transaction_applied_amount > 0 ? true : false;
  var is_offline_transaction = false;
  for (item_cat: itemCategories){
      if(item_cat.toLowerCase() == 'offline-store' || item_cat.toLowerCase() == 'offline-transaction' ||  item_cat.toLowerCase() == 'offline') {
          is_offline_transaction = true;
      }
  }

  var is_offline_transaction_with_agent = false;
  if (agentId != null && is_offline_transaction){
      is_offline_transaction_with_agent = true;
  }

  var is_offline_dekoruma_origination = false;
  for(store_initial: OFFLINE_DEKORUMA_STORES) {
    if (stringUtils.contains(initial_store_name.toLowerCase(), store_initial)) {
        is_offline_dekoruma_origination = true;
    }      
  }

  var is_offline_dekoruma_transaction = false;
  for(store_initial: OFFLINE_DEKORUMA_STORES) {
    if (stringUtils.contains(merchantName.toLowerCase(), store_initial)) {
        is_offline_dekoruma_transaction = true;
    }      
  }
  
  var is_blibli_pln_transaction = false;
  for (item_cat: itemCategories) {
        if (stringUtils.contains(item_cat.toLowerCase(), 'ele-')) {
            is_blibli_pln_transaction = true;
        }
  }
  
  var is_tiket_flight_transaction = false;
  for (item_cat: itemCategories) {
        if (stringUtils.contains(item_cat.toLowerCase(), 'flight')) {
            is_tiket_flight_transaction = true;
        }
  }
  
  var is_restricted_item = false;
  for (restricted_item: OFFLINE_RESTRICTED_ITEM){
      for (item_cat: itemCategories){
          if(stringUtils.contains(item_cat.toLowerCase(), restricted_item.toLowerCase())) {
              is_restricted_item = true;
          }
      }
  
      for (item_type: itemTypes){
          if(stringUtils.contains(item_type.toLowerCase(), restricted_item.toLowerCase())) {
              is_restricted_item = true;
          }
      }
  
      for (item_name: itemNames){
          if(stringUtils.contains(item_name.toLowerCase(), restricted_item.toLowerCase())) {
              is_restricted_item = true;
          }
      }
  }

  var is_change_item_to_ebike = false;
  for (item_type: itemTypes){
        if(!(stringUtils.contains(offline_sub_item_category.toLowerCase(), 'sepeda listrik')) && (stringUtils.contains(item_type.toLowerCase(), 'sepeda listrik'))) {
            is_change_item_to_ebike = true;
      }
  }

  var is_insurance_merchant = false; /*Offline insurance merchants */
  for (fsp_store: FSP_STORES) {
      for (store: storeNames) {
          if(stringUtils.contains(store.toLowerCase(), fsp_store)) {
              is_insurance_merchant = true;
          }
      }
  }
  
  var is_prj_merchants = false;
  for (prj_store: PRJ_STORES) {
      for (store: storeNames) {
          if(stringUtils.contains(store.toLowerCase(), prj_store)) {
              is_prj_merchants = true;
          }
      }
  }

  var is_good_instore = false;
  for (good_instore: BLIBLI_GOOD_INSTORE_LIST) {
      for (store: storeNames) {
          if(stringUtils.contains(store.toLowerCase(), good_instore)) {
            is_good_instore = true;
          }
      }
  }

  var is_good_merchant_online = false; /*Online good merchant*/
  for (good_merchant: good_merchant_online) {
        if(stringUtils.contains(merchantName.toUpperCase(), good_merchant)) {
            is_good_merchant_online = true;
        }
  }
  
  var is_current_item_offline_whitelisted_item = false;
  var is_requested_item_offline_whitelisted_item = false;
  for (item: OFFLINE_WHITELIST_ITEMS) {
      if (stringUtils.contains(lowerCaseItemNames, item)) {
          is_current_item_offline_whitelisted_item = true;
      }
      if (stringUtils.contains(offline_item_names.toLowerCase(), item)) {
          is_requested_item_offline_whitelisted_item = true;
      }
  }
  
  /* samsung + (s21/s22/s23/flip/fold/z) */
  for (samsung_series: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS) {
      if(stringUtils.contains(lowerCaseItemNames, 'samsung') 
      && stringUtils.contains(lowerCaseItemNames, samsung_series.toLowerCase())) {
          is_current_item_offline_whitelisted_item = true;
      }
      if(stringUtils.contains(offline_item_names.toLowerCase(), 'samsung') 
      && stringUtils.contains(offline_item_names.toLowerCase(), samsung_series.toLowerCase())) {
          is_requested_item_offline_whitelisted_item = true;
      }    
  }
  
  /*Apple + (iphone 12/iphone 13/iphone 14/iphone 15/ipad/macbook/imac/watch)*/
  for (apple_series: OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS) {
      if(stringUtils.contains(lowerCaseItemNames, 'apple') 
      && stringUtils.contains(lowerCaseItemNames, apple_series.toLowerCase())) {
          is_current_item_offline_whitelisted_item = true;
      }
      if(stringUtils.contains(offline_item_names.toLowerCase(), 'apple') 
      && stringUtils.contains(offline_item_names.toLowerCase(), apple_series.toLowerCase())) {
          is_requested_item_offline_whitelisted_item = true;
      }    
  }
  
  /* PRJ DUMMY TO SMARTHPHONE */
  for (store_initial: PRJ_DUMMY_LIST) {
      if (stringUtils.contains(initial_store_name.toLowerCase(), store_initial)) {
          offline_item_category = 'smartphone';
          is_requested_item_offline_whitelisted_item = false;
      } 
  }
  
  var item_name_list = stringUtils.split(itemNames, ',');
  var count_item_price_above_1mio = 0;
  
  for (itemname : item_name_list) {
        itemname_trim = itemname.replaceAll("^[ \t]+", "");
        var foundItemPrice = itemPrices[itemname_trim] == null ? itemPrices[itemname] : itemPrices[itemname_trim];
        if (foundItemPrice != null && foundItemPrice >= 1000000) {
          count_item_price_above_1mio = count_item_price_above_1mio + 1;
      }
  }
  
  /* change count_round_item_price definition for Belanja di Tokopedia */
  if (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TOKOPEDIA')) {
      count_round_item_price = 0;
  
      for (itemname : item_name_list) {
            itemname_trim = itemname.replaceAll("^[ \t]+", "");
            var foundItemPrice = itemPrices[itemname_trim] == null ? itemPrices[itemname] : itemPrices[itemname_trim];
            if (foundItemPrice != null && foundItemPrice % 100000 == 1000) {
              count_round_item_price = count_round_item_price + 1;
          }
      }
  }
  /*======================OFFLINE CONTEXT======================
  store_name: initial merchant
  offline_store_category: initial merchant category
  merchantName: current merchant
  riskMerchantCategoryName: current merchant category 
  ===========================================================*/
  
  var sanitizedMerchantNames = merchantName.replaceAll(";", "");
  
  /* offline inital good store */
  var is_initial_bad_store = stringUtils.contains(offline_store_category.toLowerCase(), 'bad');
  /* offline current bad store */
  var is_current_bad_store = stringUtils.contains(riskMerchantCategoryName.toLowerCase(), 'bad');

  /* Motor Listrik */
  /* Is listed motor listrik merchant & prefix merchant id ev2- */
  var is_motor_listrik_merchant = false;
  if(stringUtils.startsWith(merchantOrderId.toLowerCase(),'ev2-')) {
    is_motor_listrik_merchant = true;
  }

  var count_item_type_motor_listrik = 0;
  var count_item_type_non_motor_listrik = 0;
  for (itemtypes : itemTypes) {
      if (itemtypes.toLowerCase() == 'motor listrik') {
        count_item_type_motor_listrik = count_item_type_motor_listrik + 1;
      }
      if (itemtypes.toLowerCase() != 'motor listrik') {
        count_item_type_non_motor_listrik = count_item_type_non_motor_listrik + 1;
      }
  }
  
  /* medan fraud application and trx */
  var is_medan_fraud_application = false;
  for (medan_application: MEDAN_FRAUD_APPLICATION) {
      if(stringUtils.contains(initial_store_name.toLowerCase(), medan_application)) {
          is_medan_fraud_application = true;
      }
  }
  
  var is_medan_fraud_trx = false;
  for (medan_trx: MEDAN_FRAUD_TRX) {
      if(stringUtils.contains(sanitizedMerchantNames, medan_trx)) {
          is_medan_fraud_trx = true;
      }
  }
  
  /* other fraud application and trx */
  var is_other_fraud_application = false;
  for (others_application: OTHERS_FRAUD_APPLICATION) {
      if(stringUtils.contains(initial_store_name.toLowerCase(), others_application)) {
          is_other_fraud_application = true;
      }
  }
  
  var is_others_fraud_trx = false;
  for (others_trx: OTHERS_FRAUD_APPLICATION) {
      if(stringUtils.contains(sanitizedMerchantNames.toLowerCase(), others_trx)) {
          is_others_fraud_trx = true;
      }
  }
  
  /* ebike fraud application and trx */
  var is_ebike_fraud_application = false;
  for (ebike_application: EBIKE_FRAUD_APPLICATION) {
      if(stringUtils.contains(initial_store_name.toLowerCase(), ebike_application)) {
          is_ebike_fraud_application = true;
      }
  }
  
  var is_ebike_fraud_trx = false;
  for (ebike_trx: EBIKE_FRAUD_TRX) {
      if(stringUtils.contains(sanitizedMerchantNames, ebike_trx)) {
          is_ebike_fraud_trx = true;
      }
  }

  var is_merchant_non_gadget_trx = false;
  for (merchant_non_gadget: MERCHANT_NON_GADGET) {
      if(stringUtils.contains(sanitizedMerchantNames.toUpperCase(), merchant_non_gadget)) {
        is_merchant_non_gadget_trx = true;
      }
  }

  var is_agent_fraud_application = false;
  var is_agent_fraud_trx = false;
  for (fraud_agent_id: FRAUD_AGENT_LIST) {
      if(stringUtils.contains(agentId, fraud_agent_id)) {
            is_agent_fraud_trx = true;
      }

      if(stringUtils.contains(applicationAgentId, fraud_agent_id)) {
            is_agent_fraud_application = true;
      }
  }
  
  var count_item_type_smartphone = 0;
  for (itemtypes : itemTypes) {
      if (itemtypes.toLowerCase() == 'smartphone') {
          count_item_type_smartphone = count_item_type_smartphone + 1;
      }
  }

  var count_item_type_gadget = 0;
  for (itemtypes : itemTypes) {
      if (itemtypes.toLowerCase() == 'smartphone' || itemtypes.toLowerCase() == 'tablet' || itemtypes.toLowerCase() == 'laptop & notebook') {
        count_item_type_gadget = count_item_type_gadget + 1;
      }
  }
  
  /* blibliStoreLevelFeatures */
  if (ratioRoundItemPriceTrxAmt == null) {
      if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
          ratioRoundItemPriceTrxAmt = -999;
      } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
          ratioRoundItemPriceTrxAmt = -9999;
      }
  }
  
  if (isOfficialStore == null) {
      if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
          isOfficialStore = '-999';
      } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
          isOfficialStore = '-9999';
      }
  }
  
  if (badges == null) {
      if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
          badges = '-999';
      } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
          badges = '-9999';
      }
  }
  
  /* featureScoresByFeatureName */
  var sum_pulsa_pln_trx_3h = sum_pln_trx_3h + sum_pulsa_trx_3h
  
  /* item category gladys (handphone) */
  var item_category_gladys = '';
  if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (itemCategories.size()==1)) {
      if(["AN-1000028,HA-1000067,HA-1000066", "HA-1000066,AN-1000028,HA-1000067", "IP-1000003,HA-1000067,HA-1000066", "IP-1000003,HA-1000066,HA-1000067"].contains(itemCategories[0].toUpperCase())) {
              item_category_gladys = 'handphone';
          }
  }

  if (is_insurance_merchant == true) {
    return "NORMAL;FSP insurance transactions;Insurance";
  }  
  
  /* ogan komering rule */
  if ((stringUtils.contains(billingAddressCity.toLowerCase(), 'ogan') && stringUtils.contains(billingAddressCity.toLowerCase(), 'komering'))
      || (stringUtils.contains(billingAddressStreet.toLowerCase(), 'ogan') && stringUtils.contains(billingAddressStreet.toLowerCase(), 'komering'))
      || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'ogan') && stringUtils.contains(shippingAddressCity.toLowerCase(), 'komering'))
      || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'ogan') && stringUtils.contains(shippingAddressStreet.toLowerCase(), 'komering'))) {
      return "BLOCK;Ogan Komering Billing / Shipping Address Blacklist;SuspectFraud";
  }
  
  /* Account Takeover Rule */
  if((is_change_device_l30d == 'Change Device') && (count_otp_sms_l3d > 0)){
      if (number_of_recaptured_l14d > 0) {
          return "BLOCK;Change Device With OTP Sms And Recaptured;SuspectFraud";
      } else if (number_of_recaptured_l3d_above_70_percent > 0){
          return "BLOCK;Change Device With OTP Sms And LikelyRecaptured;SuspectFraud";
      } else if ((count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE') && (sum_amount_l7d_inc_now > 500000)){
          return "BLOCK;Change Device With OTP Sms And FaceNotMatch Online Transaction More Than 500K;SuspectFraud";
      } else if ((count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE')) {
          return "BLOCK;Change Device With OTP Sms And FaceNotMatch Online Transaction;SuspectFraud";
      }
  }

  /* fraud different master user id, first secondary trx */
  var userid_and_master_userid_different = false;
  if (masterUserId != null && userId != null && masterUserId != userId) {
      userid_and_master_userid_different = true;
  }
  if (isMainApplication == false && userid_and_master_userid_different && (count_prev_trx_merchant == 0) && (transactionAmount > 1000000)) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Secondary First Transaction With Different Master User ID;SuspectFraud";
    }
    else {
        return "BLOCK;Secondary First Transaction With Different Master User ID;SuspectFraud";
    }
  }
  if (stringUtils.contains(merchantName.toUpperCase(), 'XENDIT') && stringUtils.contains(store_name.toLowerCase(), 'taplink komputer') ) {
      return "BLOCK;XENDIT - TapLink Computer Suspect fraud;BlacklistedSeller";
  }
  
  if (stringUtils.contains(merchantName.toUpperCase(), 'UNIPIN') && stringUtils.contains(lowerCaseItemNames, 'reload') ) {
      return "BLOCK;UNIPIN - Reload Suspect fraud;BlacklistedItem";
  }
  
  
  /* ------------- LOGIC - pefindo category -------------*/
  var rule_pefindo = "1";
  var prefix = "";
  var good_dpd = ((percentage_latest_dpd_15_1y >= 0)
           && (percentage_latest_active_dpd_3 == 0)
           && (count_written_off_unique_creditor_2y == 0));
          
  var good_cc_dpd = ((percentage_latest_active_dpd_30 <= 0.25) && (percentage_latest_active_dpd_30 >= 0)
           && (pefindo_discounted_sum_outstanding_late <= 7.5e6) && (pefindo_discounted_sum_outstanding_late >= 0)
           && (count_outstanding_amount_active_cc > 0)
           && (count_written_off_unique_creditor_2y == 0));
          
  var very_high_cc_limit = ((max_limit_active_cc >= 25000000) || (sum_limit_active_cc >= 65000000));
  var high_cc_limit = ((max_limit_active_cc >= 15000000) || (sum_limit_active_cc >= 30000000));
  var medium_cc_limit = ((max_limit_active_cc >= 8000000) || (sum_limit_active_cc >= 20000000));
  var low_cc_limit = ((max_limit_active_cc > 0) && (sum_limit_active_cc > 0));
  var high_paylater = ((sum_paylater_settled_1y > 5000000)
               || (sum_paylater_disbursed_1y > 10000000)
               &&  (sum_paylater_settled_1y >1000000));
  if ((count_written_off_unique_creditor > 0)
   || ( (((percentage_latest_active_dpd_30> 0) && (percentage_latest_active_dpd_30<=0.25)) && ((pefindo_discounted_sum_outstanding_late== 0)))
          || ((percentage_latest_active_dpd_30==0) && ((pefindo_discounted_sum_outstanding_late> 0) && (pefindo_discounted_sum_outstanding_late<= 7.5e6)))
          || (((percentage_latest_active_dpd_30> 0) && (percentage_latest_active_dpd_30<= 0.25)) && ((pefindo_discounted_sum_outstanding_late> 0) && (pefindo_discounted_sum_outstanding_late<= 7.5e6)))   )
  ){
      prefix = "1A-";  
  }
  
  if (good_cc_dpd && very_high_cc_limit && (days_from_active_credit_card_disbursement_date > 180)){
      if (percentage_outstanding_credit_card_active > 0.7){
          rule_pefindo = prefix + "5B";
      }
      else {
          rule_pefindo = prefix + "5";  
      }
  } else if (good_cc_dpd && high_cc_limit && (days_from_active_credit_card_disbursement_date > 180)){
      if (percentage_outstanding_credit_card_active > 0.7){
          rule_pefindo = prefix + "4B";
      }
      else{
          rule_pefindo = prefix + "4";
      }
  } else if (good_cc_dpd && (medium_cc_limit || (days_from_active_credit_card_disbursement_date > 730))){
      if (percentage_outstanding_credit_card_active > 0.7){
          rule_pefindo = prefix + "3B";  
      }
      else{
          rule_pefindo = prefix + "3";        
      }
  } else if (good_cc_dpd && low_cc_limit){
      if (percentage_outstanding_credit_card_active > 0.7){
          rule_pefindo = prefix + "2CCB";
      }
      else{
          rule_pefindo = prefix + "2CC";
      }
  } else if (high_paylater && good_dpd){
      rule_pefindo = prefix + "2";    
  }
  
  /* ------------- LOGIC - identity score -------------*/
  var identity_score = -999
  /* ------------- ALL - identity_score_scoring_criteria_cli_payslip_tiket_20220125 -------------*/
  
  identity_score = 460;
  if (email_age_ever_name_match <= -99) {
      identity_score = identity_score - 16;
  } else if (email_age_ever_name_match <= -1) {
      identity_score = identity_score - 9;
  } else if (email_age_ever_name_match > -1) {
      identity_score = identity_score + 33;
  }
  
  if (phone_age_ever_name_match <= -99) {
      identity_score = identity_score - 9;
  } else if (phone_age_ever_name_match <= -1) {
      identity_score = identity_score + 0;
  } else if (phone_age_ever_name_match > -1) {
      identity_score = identity_score + 20;
  }
  if (verified_izi_mobile_phone_whatsapp == 'not verified') {
      identity_score = identity_score + 4;
  } else if (verified_izi_mobile_phone_whatsapp == 'no') {
      identity_score = identity_score - 25;
  } else if (verified_izi_mobile_phone_whatsapp == 'verified') {
      identity_score = identity_score + 45;
  } 
  if (match_ewallet_name_logic == 'OK') {
      identity_score = identity_score + 56;
  } else if (match_ewallet_name_logic == 'NOT OK') {
      identity_score = identity_score - 12;
  } else if (match_ewallet_name_logic == '-99') {
      identity_score = identity_score - 12;
  } else if (match_ewallet_name_logic == '-999') {
      identity_score = identity_score - 12;
  }
  if (hibp_name_match <= 0) {
      identity_score = identity_score - 7;
  } else if (hibp_name_match > 0) {
      identity_score = identity_score + 26;
  }
  if (["12month+", "10-12month"].contains(izi_mobile_phone_number_ages)) {
      identity_score = identity_score + 23;
  } else if (["8-10month", "0-1month", "1-2month", "6-8month", "3-4month", "2-3month", "5-6month", "4-5month"].contains(izi_mobile_phone_number_ages)) {
      identity_score = identity_score + 1;
  } else if (["-99", "-999"].contains(izi_mobile_phone_number_ages)) {
      identity_score = identity_score - 11;
  }
      
  /* ------------- LOGIC - transaction score -------------*/
  var trx_score = -999
  /* ------------- BLIBLI TIKET-------------*/
  if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") || (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME")) {
      trx_score = 483;
      if (discounted_sum_outstanding_late_1y_latest <= -1.0) {
           trx_score = trx_score - 10;
      } else if (discounted_sum_outstanding_late_1y_latest <= 14000.0) {
           trx_score = trx_score + 22;
      } else if (discounted_sum_outstanding_late_1y_latest <= 100000.0) {
           trx_score = trx_score - 14;
      } else if (discounted_sum_outstanding_late_1y_latest <= 200000.0) {
           trx_score = trx_score - 25;
      } else if (discounted_sum_outstanding_late_1y_latest <= 300000.0) {
           trx_score = trx_score - 37;
      } else if (discounted_sum_outstanding_late_1y_latest <= 600000.0) {
           trx_score = trx_score - 58;
      } else if (discounted_sum_outstanding_late_1y_latest <= 2000000.0) {
           trx_score = trx_score - 75;
      } else if (discounted_sum_outstanding_late_1y_latest <= 6000000.0) {
           trx_score = trx_score - 76;
      } else if (discounted_sum_outstanding_late_1y_latest > 6000000.0) {
           trx_score = trx_score - 84;
      }
      if (creditLimitMaxDpd <= 3.0) {
           trx_score = trx_score + 11;
      } else if (creditLimitMaxDpd <= 7.0) {
           trx_score = trx_score - 1;
      } else if (creditLimitMaxDpd <= 15.0) {
           trx_score = trx_score - 34;
      } else if (creditLimitMaxDpd <= 30.0) {
           trx_score = trx_score - 61;
      } else if (creditLimitMaxDpd > 30.0) {
           trx_score = trx_score - 93;
      }
      if (cliMaxDpdLast90d <= 0.0) {
           trx_score = trx_score + 2;
      } else if (cliMaxDpdLast90d <= 5.0) {
           trx_score = trx_score - 1;
      } else if (cliMaxDpdLast90d <= 7.0) {
           trx_score = trx_score - 11;
      } else if (cliMaxDpdLast90d <= 15.0) {
           trx_score = trx_score - 19;
      } else if (cliMaxDpdLast90d <= 30.0) {
           trx_score = trx_score - 24;
      } else if (cliMaxDpdLast90d > 30.0) {
           trx_score = trx_score - 32;
      }
      if (prevCliPaidInstallmentAvg <= -1.0) {
           trx_score = trx_score - 10;
      } else if (prevCliPaidInstallmentAvg <= 0.0) {
           trx_score = trx_score + 0;
      } else if (prevCliPaidInstallmentAvg <= 100000.0) {
           trx_score = trx_score - 15;
      } else if (prevCliPaidInstallmentAvg <= 125000.0) {
           trx_score = trx_score - 8;
      } else if (prevCliPaidInstallmentAvg <= 155000.0) {
           trx_score = trx_score - 3;
      } else if (prevCliPaidInstallmentAvg <= 180000.0) {
           trx_score = trx_score - 2;
      } else if (prevCliPaidInstallmentAvg <= 250000.0) {
           trx_score = trx_score + 3;
      } else if (prevCliPaidInstallmentAvg <= 360000.0) {
           trx_score = trx_score + 10;
      } else if (prevCliPaidInstallmentAvg <= 525000.0) {
           trx_score = trx_score + 16;
      } else if (prevCliPaidInstallmentAvg > 525000.0) {
           trx_score = trx_score + 26;
      }
      if (adjusted_limit_utilization <= 0.3) {
           trx_score = trx_score + 20;
      } else if (adjusted_limit_utilization <= 0.5) {
           trx_score = trx_score + 2;
      } else if (adjusted_limit_utilization <= 0.7) {
           trx_score = trx_score - 7;
      } else if (adjusted_limit_utilization <= 0.8) {
           trx_score = trx_score - 15;
      } else if (adjusted_limit_utilization <= 0.9) {
           trx_score = trx_score - 22;
      } else if (adjusted_limit_utilization <= 0.95) {
           trx_score = trx_score - 28;
      } else if (adjusted_limit_utilization > 0.95) {
           trx_score = trx_score - 37;
      }
      if (max_partner_score <= 0.0) {
           trx_score = trx_score - 14;
      } else if (max_partner_score <= 363.0) {
           trx_score = trx_score - 6;
      } else if (max_partner_score <= 376.0) {
           trx_score = trx_score + 1;
      } else if (max_partner_score <= 388.0) {
           trx_score = trx_score + 8;
      } else if (max_partner_score <= 407.0) {
           trx_score = trx_score + 12;
      } else if (max_partner_score > 407.0) {
           trx_score = trx_score + 29;
      }
      if (cliMaxDpdLast30d <= 0.0) {
           trx_score = trx_score + 3;
      } else if (cliMaxDpdLast30d <= 3.0) {
           trx_score = trx_score - 5;
      } else if (cliMaxDpdLast30d <= 7.0) {
           trx_score = trx_score - 32;
      } else if (cliMaxDpdLast30d <= 15.0) {
           trx_score = trx_score - 56;
      } else if (cliMaxDpdLast30d > 15.0) {
           trx_score = trx_score - 78;
      }
      if (['-9999'].contains(badges)) {
           trx_score = trx_score + 4;
      } else if (['-999'].contains(badges)) {
           trx_score = trx_score - 10;
      } else if (['Diamond'].contains(badges)) {
           trx_score = trx_score + 8;
      } else if (['Gold'].contains(badges)) {
           trx_score = trx_score + 3;
      } else if (['Silver'].contains(badges)) {
           trx_score = trx_score - 3;
      } else if (['Bronze'].contains(badges)) {
           trx_score = trx_score - 8;
      } else {
           trx_score = trx_score + 0;
      }
      if (average_age_of_relationship_rescore <= -1.0) {
           trx_score = trx_score - 1;
      } else if (average_age_of_relationship_rescore <= 0.0) {
           trx_score = trx_score - 8;
      } else if (average_age_of_relationship_rescore <= 30.0) {
           trx_score = trx_score - 22;
      } else if (average_age_of_relationship_rescore <= 90.0) {
           trx_score = trx_score - 19;
      } else if (average_age_of_relationship_rescore <= 180.0) {
           trx_score = trx_score - 18;
      } else if (average_age_of_relationship_rescore <= 360.0) {
           trx_score = trx_score - 8;
      } else if (average_age_of_relationship_rescore > 360.0) {
           trx_score = trx_score + 14;
      }
      if (days_since_last_trx <= -1.0) {
           trx_score = trx_score + 8;
      } else if (days_since_last_trx <= 1.0) {
           trx_score = trx_score - 10;
      } else if (days_since_last_trx <= 2.0) {
           trx_score = trx_score - 3;
      } else if (days_since_last_trx <= 5.0) {
           trx_score = trx_score - 2;
      } else if (days_since_last_trx <= 9.0) {
           trx_score = trx_score + 3;
      } else if (days_since_last_trx <= 15.0) {
           trx_score = trx_score + 7;
      } else if (days_since_last_trx > 15.0) {
           trx_score = trx_score + 13;
      }
      if (ratioRoundItemPriceTrxAmt <= -9999.0) {
           trx_score = trx_score + 2;
      } else if (ratioRoundItemPriceTrxAmt <= -999.0) {
           trx_score = trx_score + 2;
      } else if (ratioRoundItemPriceTrxAmt <= 0.06) {
           trx_score = trx_score + 0;
      } else if (ratioRoundItemPriceTrxAmt <= 0.2) {
           trx_score = trx_score - 3;
      } else if (ratioRoundItemPriceTrxAmt <= 0.7) {
           trx_score = trx_score - 6;
      } else if (ratioRoundItemPriceTrxAmt > 0.7) {
           trx_score = trx_score - 8;
      }
      if (['1', '1A-2', '2', '1A-2CC', '1A-2CCB', '2CC', '2CCB'].contains(rule_pefindo)) {
           trx_score = trx_score - 6;
      } else {
           trx_score = trx_score + 19;
      }
      if (['-9999'].contains(isOfficialStore)) {
           trx_score = trx_score + 1;
      } else if (['-999'].contains(isOfficialStore)) {
           trx_score = trx_score - 2;
      } else if (isOfficialStore == false) {
           trx_score = trx_score - 2;
      } else if (isOfficialStore == true) {
           trx_score = trx_score + 2;
      } else {
           trx_score = trx_score + 0;
      }
      if (['False[0.9, inf)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
           trx_score = trx_score + 5;
      } else if (['False[0.5, 0.9)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
           trx_score = trx_score - 7;
      } else if (['False[-inf, 0.3)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
           trx_score = trx_score + 10;
      } else if (['False[0.3, 0.5)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
           trx_score = trx_score - 2;
      } else if (['True'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
           trx_score = trx_score - 17;
      } else {
           trx_score = trx_score + 0;
      }
      if (count_unique_month_paid_before_trx <= 0.0) {
           trx_score = trx_score - 42;
      } else if (count_unique_month_paid_before_trx <= 3.0) {
           trx_score = trx_score - 23;
      } else if (count_unique_month_paid_before_trx <= 9.0) {
           trx_score = trx_score - 1;
      } else if (count_unique_month_paid_before_trx <= 12.0) {
           trx_score = trx_score + 4;
      } else if (count_unique_month_paid_before_trx <= 15.0) {
           trx_score = trx_score + 8;
      } else if (count_unique_month_paid_before_trx <= 20.0) {
           trx_score = trx_score + 17;
      } else if (count_unique_month_paid_before_trx > 20.0) {
           trx_score = trx_score + 61;
      }
      if (prevCliOutstandingBalance <= 0.0) {
           trx_score = trx_score + 8;
      } else if (prevCliOutstandingBalance > 0.0) {
           trx_score = trx_score - 2;
      }
      if (countCashLoan3mFdcLatest <= -1.0) {
           trx_score = trx_score - 9;
      } else if (countCashLoan3mFdcLatest <= 0.0) {
           trx_score = trx_score + 3;
      } else if (countCashLoan3mFdcLatest <= 3.0) {
           trx_score = trx_score + 6;
      } else if (countCashLoan3mFdcLatest <= 4.0) {
           trx_score = trx_score + 3;
      } else if (countCashLoan3mFdcLatest <= 5.0) {
           trx_score = trx_score - 6;
      } else if (countCashLoan3mFdcLatest <= 8.0) {
           trx_score = trx_score - 9;
      } else if (countCashLoan3mFdcLatest <= 10.0) {
           trx_score = trx_score - 20;
      } else if (countCashLoan3mFdcLatest <= 20.0) {
           trx_score = trx_score - 25;
      } else if (countCashLoan3mFdcLatest > 20.0) {
           trx_score = trx_score - 38;
      }
      if (app_list_pefindo_flag_rescore <= -1.0) {
           trx_score = trx_score + 2;
      } else if (app_list_pefindo_flag_rescore <= 220.0) {
           trx_score = trx_score + 3;
      } else if (app_list_pefindo_flag_rescore <= 280.0) {
           trx_score = trx_score - 11;
      } else if (app_list_pefindo_flag_rescore <= 330.0) {
           trx_score = trx_score - 19;
      } else if (app_list_pefindo_flag_rescore > 330.0) {
           trx_score = trx_score - 35;
      }
      if (cashMaxDpdLast30d <= -99.0) {
           trx_score = trx_score + 3;
      } else if (cashMaxDpdLast30d <= 0.0) {
           trx_score = trx_score - 9;
      } else if (cashMaxDpdLast30d <= 1.0) {
           trx_score = trx_score - 47;
      } else if (cashMaxDpdLast30d <= 3.0) {
           trx_score = trx_score - 66;
      } else if (cashMaxDpdLast30d > 3.0) {
           trx_score = trx_score - 85;
      }
      if (cashMaxDpdLast90d <= -99.0) {
           trx_score = trx_score + 1;
      } else if (cashMaxDpdLast90d <= 0.0) {
           trx_score = trx_score - 1;
      } else if (cashMaxDpdLast90d <= 1.0) {
           trx_score = trx_score - 8;
      } else if (cashMaxDpdLast90d <= 3.0) {
           trx_score = trx_score - 11;
      } else if (cashMaxDpdLast90d > 3.0) {
           trx_score = trx_score - 15;
      }
      if (countCashLoan1mFdcLatest <= -1.0) {
           trx_score = trx_score - 7;
      } else if (countCashLoan1mFdcLatest <= 2.0) {
           trx_score = trx_score + 2;
      } else if (countCashLoan1mFdcLatest <= 3.0) {
           trx_score = trx_score - 11;
      } else if (countCashLoan1mFdcLatest <= 5.0) {
           trx_score = trx_score - 20;
      } else if (countCashLoan1mFdcLatest <= 10.0) {
           trx_score = trx_score - 28;
      } else if (countCashLoan1mFdcLatest > 10.0) {
           trx_score = trx_score - 38;
      }
      if (sumAmountCancelledTrx30d <= 0.0) {
           trx_score = trx_score + 1;
      } else if (sumAmountCancelledTrx30d <= 2000000.0) {
           trx_score = trx_score - 5;
      } else if (sumAmountCancelledTrx30d <= 4000000.0) {
           trx_score = trx_score - 7;
      } else if (sumAmountCancelledTrx30d > 4000000.0) {
           trx_score = trx_score - 9;
      }
      if (count_reject_abusedet_last_30d <= -1.0) {
           trx_score = trx_score + 8;
      } else if (count_reject_abusedet_last_30d <= 0.0) {
           trx_score = trx_score + 3;
      } else if (count_reject_abusedet_last_30d <= 5.0) {
           trx_score = trx_score - 34;
      } else if (count_reject_abusedet_last_30d <= 10.0) {
           trx_score = trx_score - 41;
      } else if (count_reject_abusedet_last_30d > 10.0) {
           trx_score = trx_score - 49;
      }
      if (izi_max_multi_inquiries14d_rescore <= 0.0) {
           trx_score = trx_score + 0;
      } else if (izi_max_multi_inquiries14d_rescore <= 1.0) {
           trx_score = trx_score - 8;
      } else if (izi_max_multi_inquiries14d_rescore <= 3.0) {
           trx_score = trx_score - 13;
      } else if (izi_max_multi_inquiries14d_rescore > 3.0) {
           trx_score = trx_score - 20;
      }
      if (percentage_max_dpd_15_1y <= -1.0) {
           trx_score = trx_score + 1;
      } else if (percentage_max_dpd_15_1y <= 0.0) {
           trx_score = trx_score + 1;
      } else if (percentage_max_dpd_15_1y > 0.0) {
           trx_score = trx_score - 15;
      }
      if (countDistinctKtpDevice <= -1.0) {
           trx_score = trx_score - 2;
      } else if (countDistinctKtpDevice <= 2.0) {
           trx_score = trx_score + 0;
      } else if (countDistinctKtpDevice > 2.0) {
           trx_score = trx_score - 10;
      }
      if (sum_pulsa_pln_trx_3h <= 0.0) {
           trx_score = trx_score + 0;
      } else if (sum_pulsa_pln_trx_3h <= 1000000.0) {
           trx_score = trx_score - 10;
      } else if (sum_pulsa_pln_trx_3h <= 2000000.0) {
           trx_score = trx_score - 18;
      } else if (sum_pulsa_pln_trx_3h > 2000000.0) {
           trx_score = trx_score - 62;
      }    
  }
  
  /* ------------- INDODANA -------------*/
  if (creditLimitAccountScheme == "INDODANA_GENERIC_SCHEME") {
      trx_score = 450;
      if (cliMaxDpdLast30d <= 0) {
          trx_score = trx_score + 9;
      } else if (cliMaxDpdLast30d <= 1) {
          trx_score = trx_score + 2;
      } else if (cliMaxDpdLast30d <= 2) {
          trx_score = trx_score - 5;
      } else if (cliMaxDpdLast30d <= 3) {
          trx_score = trx_score - 22;
      } else if (cliMaxDpdLast30d <= 7) {
          trx_score = trx_score - 29;
      } else if (cliMaxDpdLast30d <= 15) {
          trx_score = trx_score - 66;
      } else if (cliMaxDpdLast30d > 15) {
          trx_score = trx_score - 99;
      }
      if (cliMaxDpdLast90d <= 0) {
          trx_score = trx_score + 9;
      } else if (cliMaxDpdLast90d <= 1) {
          trx_score = trx_score + 5;
      } else if (cliMaxDpdLast90d <= 2) {
          trx_score = trx_score + 2;
      } else if (cliMaxDpdLast90d <= 3) {
          trx_score = trx_score - 11;
      } else if (cliMaxDpdLast90d <= 7) {
          trx_score = trx_score - 19;
      } else if (cliMaxDpdLast90d <= 15) {
          trx_score = trx_score - 49;
      } else if (cliMaxDpdLast90d <= 30) {
          trx_score = trx_score - 68;
      } else if (cliMaxDpdLast90d > 30) {
          trx_score = trx_score - 84;
      }
      if (app_list_score_cli_rescore <= -1) {
          trx_score = trx_score + 15;
      } else if (app_list_score_cli_rescore <= 150) {
          trx_score = trx_score + 26;
      } else if (app_list_score_cli_rescore <= 200) {
          trx_score = trx_score + 12;
      } else if (app_list_score_cli_rescore <= 250) {
          trx_score = trx_score + 0;
      } else if (app_list_score_cli_rescore <= 280) {
          trx_score = trx_score - 13;
      } else if (app_list_score_cli_rescore <= 310) {
          trx_score = trx_score - 20;
      } else if (app_list_score_cli_rescore > 310) {
          trx_score = trx_score - 25;
      }
      if (discounted_sum_outstanding_late1y_rescore <= -1) {
          trx_score = trx_score - 29;
      } else if (discounted_sum_outstanding_late1y_rescore <= 0) {
          trx_score = trx_score + 13;
      } else if (discounted_sum_outstanding_late1y_rescore <= 100000) {
          trx_score = trx_score - 4;
      } else if (discounted_sum_outstanding_late1y_rescore <= 500000) {
          trx_score = trx_score - 23;
      } else if (discounted_sum_outstanding_late1y_rescore > 500000) {
          trx_score = trx_score - 38;
      }
      if (adjusted_limit_utilization <= 0.3) {
          trx_score = trx_score + 50;
      } else if (adjusted_limit_utilization <= 0.5) {
          trx_score = trx_score + 15;
      } else if (adjusted_limit_utilization <= 0.7) {
          trx_score = trx_score + 2;
      } else if (adjusted_limit_utilization <= 0.8) {
          trx_score = trx_score - 8;
      } else if (adjusted_limit_utilization <= 0.9) {
          trx_score = trx_score - 18;
      } else if (adjusted_limit_utilization <= 0.95) {
          trx_score = trx_score - 19;
      } else if (adjusted_limit_utilization > 0.95) {
          trx_score = trx_score - 40;
      }
      if (day_latest_to_earliest_payment_date_last3y_before_trx <= -99) {
          trx_score = trx_score - 11;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 0) {
          trx_score = trx_score - 1;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 30) {
          trx_score = trx_score + 0;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 90) {
          trx_score = trx_score + 1;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 180) {
          trx_score = trx_score + 0;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 270) {
          trx_score = trx_score + 2;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 450) {
          trx_score = trx_score + 5;
      } else if (day_latest_to_earliest_payment_date_last3y_before_trx > 450) {
          trx_score = trx_score + 8;
      }
      if (average_age_of_relationship_rescore <= -1) {
          trx_score = trx_score - 12;
      } else if (average_age_of_relationship_rescore <= 0) {
          trx_score = trx_score - 13;
      } else if (average_age_of_relationship_rescore <= 30) {
          trx_score = trx_score - 10;
      } else if (average_age_of_relationship_rescore <= 90) {
          trx_score = trx_score - 5;
      } else if (average_age_of_relationship_rescore <= 180) {
          trx_score = trx_score - 3;
      } else if (average_age_of_relationship_rescore <= 360) {
          trx_score = trx_score + 0;
      } else if (average_age_of_relationship_rescore > 360) {
          trx_score = trx_score + 14;
      }
      if (count_unique_month_paid_before_trx <= 0) {
          trx_score = trx_score - 37;
      } else if (count_unique_month_paid_before_trx <= 3) {
          trx_score = trx_score + 2;
      } else if (count_unique_month_paid_before_trx <= 6) {
          trx_score = trx_score + 3;
      } else if (count_unique_month_paid_before_trx <= 9) {
          trx_score = trx_score + 6;
      } else if (count_unique_month_paid_before_trx <= 12) {
          trx_score = trx_score + 12;
      } else if (count_unique_month_paid_before_trx > 12) {
          trx_score = trx_score + 24;
      }
      if (['True'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
          trx_score = trx_score - 15;
      } else if (['False[-inf, 0.3)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
          trx_score = trx_score + 3;
      } else if (['False[0.3, 0.5)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
          trx_score = trx_score + 9;
      } else if (['False[0.5, 0.9)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
          trx_score = trx_score + 13;
      } else if (['False[0.9, inf)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
          trx_score = trx_score + 13;
      }
      if (['badrate 0%-3%'].contains(item_group_risk)) {
          trx_score = trx_score + 10;
      } else if (['badrate 3%-6%'].contains(item_group_risk)) {
          trx_score = trx_score + 4;
      } else if (['badrate 6%-9%'].contains(item_group_risk)) {
          trx_score = trx_score - 4;
      } else if (['badrate 9%-12%', 'badrate > 12%'].contains(item_group_risk)) {
          trx_score = trx_score - 20;
      }
      if (number_of_installed_loan_apps_within14days_rescore <= -99.0) {
          trx_score = trx_score + 10;
      } else if (number_of_installed_loan_apps_within14days_rescore <= 0) {
          trx_score = trx_score + 3;
      } else if (number_of_installed_loan_apps_within14days_rescore <= 1) {
          trx_score = trx_score - 7;
      } else if (number_of_installed_loan_apps_within14days_rescore > 1) {
          trx_score = trx_score - 19;
      }
      if (["1", "1A-2", "2", "2CC", "2CCB", "1A-2CC", "1A-2CCB"].contains(rule_pefindo)) {
          trx_score = trx_score - 5;
      } else {
          trx_score = trx_score + 30;
      }
      if (shipping_purchase_ratio <= 0) {
          trx_score = trx_score - 6;
      } else if (shipping_purchase_ratio <= 0.03) {
          trx_score = trx_score + 8;
      } else if (shipping_purchase_ratio > 0.03) {
          trx_score = trx_score + 15;
      }
      if (percentage_latest_dpd_15_1y <= -1) {
          trx_score = trx_score - 1;
      } else if (percentage_latest_dpd_15_1y <= 0.1) {
          trx_score = trx_score + 1;
      } else if (percentage_latest_dpd_15_1y <= 0.2) {
          trx_score = trx_score + 0;
      } else if (percentage_latest_dpd_15_1y <= 0.5) {
          trx_score = trx_score - 2;
      } else if (percentage_latest_dpd_15_1y > 0.5) {
          trx_score = trx_score - 6;
      }
      if (count_round_item_price <= 0) {
          trx_score = trx_score + 2;
      } else if (count_round_item_price > 0) {
          trx_score = trx_score - 25;
      }
      if (percentage_max_dpd_15_1y <= -1) {
          trx_score = trx_score - 3;
      } else if (percentage_max_dpd_15_1y <= 0) {
          trx_score = trx_score + 4;
      } else if (percentage_max_dpd_15_1y > 0) {
          trx_score = trx_score - 21;
      }
      if (izi_max_multi_inquiries14d_rescore <= 0) {
          trx_score = trx_score + 1;
      } else if (izi_max_multi_inquiries14d_rescore <= 1) {
          trx_score = trx_score - 14;
      } else if (izi_max_multi_inquiries14d_rescore <= 3) {
          trx_score = trx_score - 15;
      } else if (izi_max_multi_inquiries14d_rescore <= 5) {
          trx_score = trx_score - 26;
      } else if (izi_max_multi_inquiries14d_rescore > 5) {
          trx_score = trx_score - 48;
      }
  }
  /* --------------------------*/
  /* rejected cash after cli submit */
  if (!blacklistHelper.isWhitelistedBulkCheck('phones', 'production-tester-user', {"phoneNumber": userPhoneNumber}, whitelistedResults)) {
    
    /* 1y rule */
    if ((countRejectedCashNikLevelLast1y > 0) && (!stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
        if (stringUtils.contains(riskGrade.toUpperCase(), 'B')) {
            if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
            }
        } else {
            return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
        }
    }

    /* 60d rule */
    if (count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup > 0) {
        if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) || (stringUtils.contains(riskGrade.toUpperCase(), 'B'))) {
            if (stringUtils.contains(riskGrade.toUpperCase(), 'A')) {
                if (count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup > 0) {
                    if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                        return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                    }
                }
            } else {
                if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                    return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                }
            }
        } else {
            return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
        }
    }
  }
  
  if (
      (stringUtils.contains(merchantName.toLowerCase(), 'gramedia') || (stringUtils.contains(merchantName, 'KAWAN LAMA'))) 
      && (agentId != null)
  ) {
      return `REJECT;Merchant ${merchantName} transaction using promotor app agentId ${agentId};PromotorAppTransaction`;
  }
  
  if (stringUtils.contains(merchantName.toUpperCase(), 'XENDIT')) {
      var contains_whitelist_store = false;
      var storename = '';
      for (whitelist_store: XENDIT_WHITELIST_STORES) {
          for (store: storeNames) {
              /*  convert store to lowercase */
              /*  check if lowercase store contains whitelist_store */
              storename = store;
              if(stringUtils.contains(store.toLowerCase(), whitelist_store)) {
                  contains_whitelist_store = true;
              }
          }
      }
      for (whitelist_store: XENDIT_WHITELIST_STORES_2) {
          for (store: storeNames) {
              /*  convert store to lowercase */
              /*  check if lowercase store contains whitelist_store */
              storename = store;
              if(store.toLowerCase() == whitelist_store.toLowerCase()) {
                  contains_whitelist_store = true;
              }
          }
      }
      if (contains_whitelist_store == false) {
          return `REJECT;XENDIT - ${storename} not whitelisted yet;BlacklistedSeller`;
      }
  }
  
  if ((is_offline_transaction == false) && (is_insurance_merchant == false) && (count_installed_fraud_app_90d >= 1)) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Installed fraud apk within 90d;SuspectFraud;Install Fraud Apk";
    } else {
        return "BLOCK;Installed fraud apk within 90d;SuspectFraud";
    }
  }
  
  if (rapidTransactionCount > 10) {
    return 'BLOCK;Rapid Transaction Count >10;BlacklistedUser';
  }

  var count_prev_approved_trx_24h = featureScoresByFeatureName['count_prev_approved_trx_24h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_24h'];
  if (count_prev_approved_trx_24h >= 25){
    return "BLOCK;Rapid Transaction >= 25 within 24h;BlacklistedUser";
  }
  
  var count_prev_approved_trx_3d = featureScoresByFeatureName['count_prev_approved_trx_3d'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_3d'];
  if (count_prev_approved_trx_3d >= 58){
    return "BLOCK;Rapid Transaction >= 58 within 3d;BlacklistedUser";
  }

  var count_prev_approved_trx_merchant_by_amount_3h = featureScoresByFeatureName['count_prev_approved_trx_merchant_by_amount_3h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_by_amount_3h'];
  if (transactionAmount >= 1000000) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION){
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "SUSPICIOUS;Digital Products by Cermati High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "SUSPICIOUS;Blibli Paylater High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "SUSPICIOUS;Tiket Paylater High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "SUSPICIOUS;VA High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        }
    } else {
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "REJECT;Digital Products by Cermati High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "REJECT;Blibli Paylater High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "REJECT;Tiket Paylater High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "REJECT;VA High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        }
    }
  } else if (transactionAmount < 1000000) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION){
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "SUSPICIOUS;Digital Products by Cermati Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "SUSPICIOUS;Blibli Paylater Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "SUSPICIOUS;Tiket Paylater Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "SUSPICIOUS;VA Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";    
        }
    } else {
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "REJECT;Digital Products by Cermati Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "REJECT;Blibli Paylater Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "REJECT;Tiket Paylater Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "REJECT;VA Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";    
        }
    }
  }
  
  if (stringUtils.contains(initial_store_name.toUpperCase(), 'BLIBLI EVENT GRAND INDONESIA')) {
      return "NORMAL;Whitelisted Blibli Instore transactions;"
  }
  
  for (whitelist_store: BLIBLI_INSTORE_WHITELIST_GI) {
      if (merchantPlatformStoreIds.contains(whitelist_store)) {
          return "NORMAL;Whitelisted Blibli Instore transactions;"
      }
  }

  for (whitelist_store: BLIBLI_INSTORE_WHITELIST) {
      if (merchantPlatformStoreIds.contains(whitelist_store)) {
          if (hasNonLimitActiveCashLoanContract) {
              if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") && (isMainApplication == false)) {
                  if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score<520)) {
                      return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                  } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                      return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                  }
              } else if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME")
                        && ((!is_silverlist) /* non silverlist */
                            || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist exclude A7 */
                            || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
                        )
              ) {
                  if (trx_score < 460) {
                      return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                  } else if ((trx_score < 480) && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                      return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                  } else {
                      return "NORMAL;Whitelisted Blibli Instore transactions;"
                  }
              } else {
                  return "NORMAL;Whitelisted Blibli Instore transactions;"
              }
          } else {
              return "NORMAL;Whitelisted Blibli Instore transactions;"
          }
      }
  }


  var BLIBLI_STORE_WHITELISTED_JEWELLERY = false;
  for (whitelist_store: BLIBLI_JEWEL_WHITELIST) {
    if (merchantPlatformStoreIds.contains(whitelist_store)) {
      BLIBLI_STORE_WHITELISTED_JEWELLERY = true;
    }
  }

  if (isBlacklisted && !BLIBLI_STORE_WHITELISTED_JEWELLERY) {
    return "REJECT;Blacklisted Keywords Detected;BlacklistedSeller";
  }          

  if (merchantName == 'Bank Sahabat Sampoerna') {
      return "REJECT;Bank Sahabat Sampoerna / Paylater Card Transaction;SystemMaintenance";
  }
  
  var BLACK_COUNTRY_LIST = ['iran','myanmar','north korea'];
  var address = "";
  
  if (billingAddressStreet != null) {
      address += billingAddressStreet.toLowerCase() + " ";
  }
  
  if (shippingAddressStreet != null) {
      address += shippingAddressStreet.toLowerCase();
  }
  
  var subbefore = "";
  var lastcharsubbefore = "";
  var firstcharsubafter = "";
  
  for (black_country: BLACK_COUNTRY_LIST) {
      if (stringUtils.contains(address, black_country)) {
          subbefore = stringUtils.substringBefore(address, black_country);
          lastcharsubbefore = subbefore.charAt(subbefore.length()-1)+"";
          firstcharsubafter = stringUtils.substringAfter(address, black_country).charAt(0)+"";
          if (!(stringUtils.isAlpha(firstcharsubafter) || stringUtils.isAlpha(lastcharsubbefore))) {
              return "REJECT;Black Country Keywords Found;BlacklistedCountry";
          }
      }
  }
  
  /* ------------------Account Takeover Rule to Real Time Review-------------------*/
  if((is_change_device_l30d == 'Change Device') && (count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE')){
    if (sum_amount_l7d_inc_now > 500000){
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Change Device And FaceNotMatch Online Transaction More Than 500K;SuspectFraud;Account Takeover Activity";
        } else {
            return "BLOCK;Change Device And FaceNotMatch Online Transaction More Than 500K;SuspectFraud";
        } 
    } else {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Change Device And FaceNotMatch Online Transaction;SuspectFraud;Account Takeover Activity";
        } else {
            return "BLOCK;Change Device And FaceNotMatch Online Transaction;SuspectFraud";
        }
    }
  }
  
  /* ------------------Ad hoc fraud rule-------------------*/
  var is_liveness_not_match = 'liveness match';
  
  /* Rule for blocking or real time transaction on liveness selfie does not match */
  if ((count_low_risk_facematch_score_1d > 0) && (merchantCategory != 'OFFLINE') && (is_insurance_merchant == false)) {
      if (is_tokopedia != 'true') {
          if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
              return "SUSPICIOUS;Have Liveness Selfie Not Match (99.95) Within 1 Day;SuspectFraud;Liveness Not Match";
          } else {
              is_liveness_not_match = 'liveness not match';
          }    
      }
  }

  
  if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
    /* malahayati rule */
    if (
        ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prapatan raya no.2')) || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prpt. raya no.2'))) /* malahayati mampang */
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prapatan raya no.37')) || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prpt. raya no.37')) ) /* malahayati mampang */
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prapatan raya no.99')) || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. mampang prpt. raya no.99'))) /* malahayati mampang */
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. meruya ilir raya no.8')) && (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'rw.6'))) /* malahayati meruya */
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'Jl. meruya ilir raya no.10a'))) /* malahayati meruya new - 17 July 2025*/
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. pesona anggrek harapan no.15')) && (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'bekasi utara'))) /* malahayati bekasi */
        || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'malahayati')) /* malahayati*/
        || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'qr5g+558')) /* malahayati mampang*/
        || (stringUtils.contains(shippingName.toLowerCase(), 'malahayati')) /* malahayati*/
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Malahayati Fraud;SuspectFraud;Malahayati";
        } else {
            return "BLOCK;Suspected Malahayati Fraud;SuspectFraud";
        }
    }


/* SHIPPING ADDRESS TO SOUTH SUMATERA */

if (
	(is_offline_transaction == false) && (is_insurance_merchant == false) && 
    ((address_is_current_address == 'tidak')
    && 
    ((!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'banyuasin')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'banyu asin')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'lubuklinggau')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'lubuk linggau')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'muara enim'))    && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'ogan komering'))&& (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'oku timur'))&& (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'ogan ilir')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'musi rawas')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'prabumulih')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'lahat')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'penukal abab lematang')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'pagar alam')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'empat lawang')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'palembang')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'bukit kecil')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'sekayu')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'muara beliti')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'rupit')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'pagaralam')) && (!stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'talang ubi'))        )
    &&
    ((stringUtils.contains(shippingAddressCity.toLowerCase(), 'banyuasin')) || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'banyu asin'))  || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'lubuklinggau'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'lubuk linggau'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'muara enim'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'ogan komering'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'oku timur'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'ogan ilir'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'musi rawas'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'prabumulih'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'lahat'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'penukal abab lematang'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'pagar alam'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'empat lawang'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'palembang'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'bukit kecil'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'sekayu'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'muara beliti'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'rupit'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'pagaralam'))   || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'talang ubi'))     )
)) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Shipping Address Fraud;SuspectFraud;ShippingAddress";
        } else {
            return "BLOCK;Suspected Shipping Address Fraud;SuspectFraud";
        }
    }


    
    if (
        ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'pusat grosir cililitan (pgc)')) /*Pusat Grosir Cililitan (PGC)*/
        || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'cililitan'))) /* cililitan */
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspicious Address;SuspectFraud;PGC";
        } else {
            return "BLOCK;Suspicious Address;SuspectFraud;PGC";
        }
    }
  }
 
  if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION && (adjusted_limit_utilization >= 0.8) && (is_tiket_flight_transaction) && (sumTotalPayment <= 0) && (transactionAmount >= 500000)
        && (
            ((address_is_current_address == 'ya') && ((stringUtils.contains(applicant_residence_city.toLowerCase(), 'jakarta')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'bekasi')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'tangerang')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'bogor')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'depok'))))
            || ((address_is_current_address == 'tidak') && ((stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'jakarta')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'bekasi')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'tangerang')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'bogor')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'depok'))))
			    )
		) {
		    return "SUSPICIOUS;Suspicious Tiket Transaction;SuspectFraud;Suspect Malahayati";
        }
  }
  
  /* ------------- LOGIC - transaction category -------------*/
  var trx_category = 'other';
  var null_parameters = '';
  
  /* ------------- BLIBLI -------------*/
  if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
      if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
          trx_category = 'cannot be categorized - contain null parameter';
          if (size(scoringFeature) == 0){
              null_parameters += 'scoringFeature';
          }
          if (size(featureScoresByFeatureName) == 0){
              null_parameters += ',featureScoresByFeatureName';
          }
      }
  }
  /* ------------- TIKET -------------*/
  if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") {
      if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
          trx_category = 'cannot be categorized - contain null parameter';
          if (size(scoringFeature) == 0){
              null_parameters += 'scoringFeature';
          }
          if (size(featureScoresByFeatureName) == 0){
              null_parameters += ',featureScoresByFeatureName';
          }
      }
  }
  /* ------------- INDODANA -------------*/
  if (creditLimitAccountScheme == "INDODANA_GENERIC_SCHEME") {
      if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
          trx_category = 'cannot be categorized - contain null parameter';
          if (size(scoringFeature) == 0){
              null_parameters += 'scoringFeature';
          }
          if (size(featureScoresByFeatureName) == 0){
              null_parameters += ',featureScoresByFeatureName';
          }
      } else if (
          (number_of_installed_loan_apps_within14days_rescore > 2)
          && (adjusted_limit_utilization > 0.7)
          && (max_diff_transaction_creation_to_submit >= 0)
          && (max_diff_transaction_creation_to_submit <= 168)
      ) {
          trx_category = 'bad installed loan apps 14d';
      } else if (
          (number_of_installed_loan_apps_within14days_rescore == 2)
          && (trx_score < 420)
          && (max_diff_transaction_creation_to_submit >= 0)
          && (max_diff_transaction_creation_to_submit <= 168)
      ) {
          trx_category = 'bad installed loan apps 14d';
      } else if (
          (number_of_installed_loan_apps_within14days_rescore > 2)
          && (adjusted_limit_utilization > 0.5)
          && (max_diff_transaction_creation_to_submit >= 0)
          && (max_diff_transaction_creation_to_submit <= 168)
      ) {
          trx_category = 'bad installed loan apps 14d - for online trx';
      } else if (
          (trx_score < 390)
      ) {
          trx_category = 'bad trx score';
      } 
  }      
  
  /* --------------------------*/
  var experiment_code = abTestingHelper.getVariation(entityId, 'AUTO_APPROVE_RULE_ENGINE_EXPERIMENT', '-999');
  var total_limit_usage = bucketizedCreditLimitAccountLimit - (bucketizedCreditLimitAccountLimitBalance - transactionAmount);
  var total_limit_cumulative_usage = bucketizedCreditLimitAccountLimit - (bucketizedCreditLimitAccountLimitBalance + transactionAmount);
  
  trx_score = trx_score.toString();
  var message = ('trx_additional_info'+';'+entityId+';'+purchaseTransactionId+';'+trx_score+';'+trx_category+';'+rule_pefindo+';'+total_limit_usage+';'+experiment_code+';'+day+';'+hour+';'+amount_1mo_to_limit_ratio+';'+amount_1mo_to_limit_ratio_limit_equals_exposure_combined+';'+count_active_cash_loan+';'+max_multiplier+';'+null_parameters+';'+is_liveness_not_match);
  log.info(message);
  
  /* ---------------------------- BLACKLIST AND FRAUD RULE ---------------------------- */
  if (stringUtils.contains(userEmail, 'hi2.in')) {
      return 'BLOCK;Fraud Email;BlacklistedUser';
  }
  
  if ((transactionAmount > 105000) && !(merchantName == 'Tiket Paylater') && !(merchantName == 'E-Wallet by Cermati')) {
      for (item: FRAUD_ITEM_NAMES) {
          if (stringUtils.contains(lowerCaseItemNames, item)) {
              return `BLOCK;Item Name Contains Keyword ${item};BlacklistedItem`;
          }
      }     
  }
  
  if (merchantName == 'Itemku' || merchantName == 'BUKALAPAK Marketplace') {
      for (item: FRAUD_ITEM_NAMES) {
          if(stringUtils.contains(lowerCaseItemNames, item)) {
              return `BLOCK;Item Name Contains Keyword ${item};BlacklistedItem`;
          }
      }
  }
  
  /* ------------[Dekoruma Rule] Dekoruma Rule Reject Change Store Before X Period -------------*/
  /*Context: Lock Dekoruma Origination and prevent change store before 60 days */
  if (is_offline_dekoruma_origination == true && is_offline_dekoruma_transaction == false && max_diff_transaction_creation_to_submit >= 0 && max_diff_transaction_creation_to_submit <= 1440) {
    return 'REJECT;Offline Dekoruma Origination Change Store Attempt;OfflineDekorumaOriginationChangeStoreAttempt';
  }
  /* ------------[Dekoruma Rule] Dekoruma Rule Reject Utilization 30Mio In Non Dekoruma Merchant*/
  if (is_offline_dekoruma_origination == true && is_offline_dekoruma_transaction == false && max_diff_transaction_creation_to_submit > 1440 && total_limit_usage >= 30000000) {
      return 'REJECT;Offline Dekoruma Origination Attempt Utilize 30Mio In Other Merchant;OfflineDekorumaOriginationAttemptUtilize30MioInOtherMerchant';
  }

  /* ------------[Offline Rule] Fraud Agent Reject-------------*/
  if ((is_agent_fraud_application == true) || (is_agent_fraud_trx == true)) {
      return 'BLOCK;Offline Agent Fraud;OfflineAgentFraudBlock';
  }
  
  /* ------------[Offline Rule] Offline Medan Fraud Block -------------
  if ((is_medan_fraud_application == true)) {
      return 'BLOCK;Offline Medan Fraud;OfflineMedanFraudBlock';
  }
  */
  /* ------------[Offline Rule] Offline Auto EV Fraud Block -------------*/
  if ((is_ebike_fraud_application == true)|| (is_ebike_fraud_trx == true)) {
      return 'BLOCK;Offline Ebike Fraud;OfflineEbikeFraudBlock';
  }
  
  /* ------------[Offline Rule] Offline Others Fraud Block -------------*/
  if ((is_other_fraud_application == true) || (is_others_fraud_trx == true)) {
      return 'BLOCK;Offline Others Fraud;OfflineOthersFraudBlock';
  }

  /* ------------[Offline Rule] All Origination --> Offline Transaction and ever suspect fraud-------------*/
  if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (count_prev_suspect_fraud > 0)) {
      return 'BLOCK;Offline Transaction ever suspect fraud;OfflineEverSuspectFraudBlock';
  }
  
  /* ------------[Offline Rule] Offline Reject Motor Listrik (for Non Motor Listrik Merchant) -------------*/
  if ((is_restricted_item == true && !is_motor_listrik_merchant)) {
      return 'REJECT;Offline Motor Listrik In Non Motor Listrik Merchant;OfflineMotorListrikInNonMotorListrikMerchant';
  }

  /* ------------[Offline Rule] Offline Reject 1++ Motor Listrik in one bill-------------*/
  if (is_motor_listrik_merchant && count_item_type_motor_listrik>=2) {
      return 'REJECT;Offline Reject More Than 1 Motor Listrik In One Bill;OfflineRejectMoreThan1MotorListrikInOneBill';
  }

  /* ------------[Offline Rule] Offline Reject Motor Listrik With Other Financing -------------*/
  if (is_motor_listrik_merchant && count_item_type_motor_listrik==1 && count_item_type_non_motor_listrik>=1) {
    return 'REJECT;Offline Reject Motor Listrik With Other Financing;OfflineRejectMotorListrikWithOtherFinancing';
  }

  /* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik Last 30 Day -------------*/
  /* ever purchase motor listrik + currently purchase motor listrik */
  if (count_motor_listrik_purchased_30d>=1 && count_item_type_motor_listrik>=1) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik Last 30 Day;OfflineRejectEverPurchaseMotorListrikLast30Day';
  }

  /* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone -------------*/
  /* ever purchase motor listrik and smartphone + currently purchase smartphone again */
  if (count_motor_listrik_purchased_30d>=1 && count_smartphone_purchased_30d>=1 && count_item_type_smartphone>=1) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone;OfflineRejectEverPurchaseMotorListrikWithAttemptPurchase2Smartphone';
  }

  /* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone -------------*/
  /* ever purchase motor listrik + currently purchase 2 smartphone in 1 bill again */
  if (count_motor_listrik_purchased_30d>=1 && count_item_type_smartphone>=2) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone;OfflineRejectEverPurchaseMotorListrikWithAttemptPurchase2Smartphone';
  }

  /* ------------[Offline Rule] Offline Reject Change Item to E-Bike -------------*/
      /*Reduce Blockrate for those who hv no transaction after X period */
      /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
      /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
  if (max_diff_transaction_creation_to_submit <= 720 && (max_diff_transaction_creation_to_submit> -99 || days_since_last_trx > -99)) {
      if (is_prj_merchants == false){
          if (is_change_item_to_ebike == true) {
              return 'REJECT;Offline Change Ebike Within 30 Days;OfflineChangeEBikeReject';
          } 
      }
  }

  /* ------------[Offline Rule] Offline Reject Gadget on Selected Merchant -------------*/
  if (is_merchant_non_gadget_trx == true) {
      if (count_item_type_gadget >= 1) {
          return 'REJECT;Offline Selected Merchant non-Gadget;OfflineMerchantNonGadget';
      }
  }
  
  /* ------------[Offline Rule] Offline initial transaction store in Ibox but transacting in other store (Tagging Suspect Fraud)-------------*/
  if (
      (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME')
      && (stringUtils.contains(initial_store_name.toUpperCase(), 'IBOX')) /* initial transaction store is ibox*/
      && !(stringUtils.contains(merchantName.toUpperCase(), 'IBOX')) && !(stringUtils.contains(merchantName.toUpperCase(), 'FOKUS SOLUSI PROTEKSI')) /* current transaction store is not ibox and not insurance*/
      && !(stringUtils.contains(previous_purchases_merchants.toUpperCase(), 'IBOX')) /* no previous successful ibox transactions*/
      && (max_diff_transaction_creation_to_submit >= 0) & (max_diff_transaction_creation_to_submit <= 720) /* current transactions happened within 30d after submit*/
      ) {
          if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && (transactionAmount >= 2000000) && ALLOW_SUSPICIOUS_TRANSACTION) {
              return "SUSPICIOUS;Suspect Fraud IBOX;SuspectFraud;Suspect Fraud IBOX";
          }
  }
  
  /* Dump these BLIBLI to AF team */
  if (
    (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME')
    && (identity_score < 440)
    && (transactionAmount >= 500000) 
    && (adjusted_limit_utilization > 0.8) 
    && (sumTotalPayment <= 0)
    && (max_partner_score > 0)
    && (phone_model_class == 'Iphone')
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspect Fraud Blibli;SuspectFraud;Suspect Fraud Blibli";
        } else {
            return "REJECT;Suspect Fraud Blibli New Account Maxout Low Identity;LowTransactionScore";
        }
}
  
  if (creditLimitAccountMaxDpd > 30) {
      return "REJECT;CLA Max DPD > 30;BadDpd";
  }
   
  var isPromoAbuser = blacklistHelper.isBlacklistedBulkCheck('phones', 'promo-abuse', { "phoneNumber": userPhoneNumber }, blacklistedResults);
  var hasDiscount = partnerDiscountAmount > 30000; /*To handle shipping discount*/
  
  if (stringUtils.contains(merchantName.toLowerCase(), 'tokopedia') & isPromoAbuser & hasDiscount & partnerDiscountAmount*100.0/(partnerDiscountAmount+transactionAmount) > 10.0){
      return "REJECT;User in Blacklist, Promo Abuser in Tokopedia;BlacklistedUser";
  }
  
  /* ------------------------------------------------------------------------------------ */
  
  if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && transactionAmount < 500000) {
    if (isPulsaTransaction && countOfPurchaseByItem['PULSA'] > 10) {
      return "REJECT;Pulsa transaction count > 10 in last 30d;HighTransactionCount";
    }
    else if (
          creditLimitAccountScheme == "LINK_AJA_WHITELABEL_SCHEME" ||
          creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" ||
          creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME" || 
          creditLimitAccountScheme == "BUKALAPAK_WHITELABEL_SCHEME" ||
          creditLimitAccountScheme == "MITRA_BLIBLI_WHITELABEL_SCHEME"
    ) {
        return "NORMAL;Whitelabel Scheme";
    } else {
        return "NORMAL;Safe Transaction";
    }
  }
  
  if (hasNonLimitActiveCashLoanContract) {
      if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") && (isMainApplication == false)) {
          if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score<520)) {
              return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
          } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
              return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
          }
      } else if ((!is_silverlist) /* non silverlist */
                || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
      ) {
          if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
                if ((is_good_merchant_online == true) && trx_score < 460) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (is_good_merchant_online == false) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
          } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
              if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 450)) {
                  return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
              } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 460)) {
                  return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
              }
          } else if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
              if (trx_score < 460) {
                  return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
              } else if ((trx_score < 480) && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                  return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
              }
          }
      }
  }
  
  /* BLIBLI Reject Item Category */
  if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {   
      /* 1 phone */
      if (item_category_gladys == 'handphone') {
          if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 400) {
              return `BLOCK;transaction score < 400, RG A, buy phone;LowTransactionScore`;
          } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 410) {
              return `BLOCK;transaction score < 410, buy phone;LowTransactionScore`;
          }
      }
      /* multiple phone */
      if (count_handphone_purchase_blibli > 1 && trx_score < 490) {
          return `BLOCK;transaction score < 490, buy multiple phone;LowTransactionScore`;
      }
  }
  
  if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' || creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
      if ((isPulsaTransaction) && (is_offline_transaction == false)) {
          if (totalPurchaseAmountByItem["PULSA"] != null && !stringUtils.contains(lowerCaseItemNames, 'telkomsel halo')) {
              if (totalPurchaseAmountByItem["PULSA"] > 400000 && riskGradeOfflineScore < 500) {
                  return "REJECT;Cumulative Monthly Pulsa > 400000;HighTransactionAmount";
              } else if (totalPurchaseAmountByItem["PULSA"] > 2000000 && riskGradeOfflineScore >= 500) {
                  return "REJECT;Cumulative Monthly Pulsa > 2mio for high offline score;HighTransactionAmount";
              }
          } 
          
          if (transactionAmount > 500000) {
              return "REJECT;Pulsa transaction amount > 500k;HighTransactionAmount";
          }
      }
      
      /* PLN Postpaid Fraud Rule */
      if ((merchantName == 'Digital Products by Cermati') && (stringUtils.contains(lowerCaseItemNames, "pln"))) {
          if (riskGrade == 'A-' && transactionAmount > 5000000) {
              return "REJECT;PLN transaction amount > 5 Mio;HighTransactionAmount";
          } else if (riskGrade != 'A-' && riskGrade != 'A+' && transactionAmount > 2000000) {
              return "REJECT;PLN transaction amount > 2 Mio;HighTransactionAmount";
          } else if (sum_pln_trx_6h > 5000000) {
              return "REJECT;PLN Postpaid cumulative PLN in last 6 hours > 5 Mio;HighTransactionAmount";
          }
      }
      
  
      if (ALFAMART_LIST.contains(merchantName)) {
          if (transactionAmount >= 500000) {
              return "REJECT;Alfamart transaction amount >= 500k;HighTransactionAmount";
          }
      }
  }
  /* disabling this rule due to unsure effect because of the shared limit changes
  if (
      (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' || creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" || creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME")
      && merchantName != 'PT Fokus Solusi Proteksi'    
  ) {
      if ((countOfMaxedOutLimit70 > 1) && (sumTotalPayment < 100000)) {
          return "BLOCK;Maxed Out Multiple Limit, No Payment;MaxedOutUsage";
      }
      if ((countOfMaxedOutLimit70 > 0) && (sumTotalPayment < 100000) && (bucketizedCreditLimitAccountLimitBalance >= bucketizedCreditLimitAccountLimit * 0.3)) {
          return "REJECT;Maxed Out Limit, No Payment, Transacting in Other CLI;MaxedOutUsage";
      }
  }
  */
  
  /* ------------[Offline Rule] Handler for Change Item Category: Non-MP to MP + Max out 85%-------------*/
  if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_origination == true) && (is_offline_transaction == true) && (is_insurance_merchant == false)) {
  
      /*Reduce Blockrate for those who hv no transaction after X period */
      /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
      /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
      if (max_diff_transaction_creation_to_submit <= 1440 && (max_diff_transaction_creation_to_submit> -99 || days_since_last_trx > -99)) {
          if (sumTotalPayment == -1) { /*Null handler logic if sumTotalPayment is null */
              if (adjusted_limit_utilization >=0.85 && prevCliPaidInstallmentAvg <= 0 && offline_item_category != 'smartphone' && count_item_type_smartphone >= 1) {
                  return 'BLOCK;Offline Change non-MP to MP + max out 85%;OfflineAttemptChangeItemCategory';
              }
          } else {
              if (adjusted_limit_utilization >=0.85 && sumTotalPayment < 500000 && offline_item_category != 'smartphone' && count_item_type_smartphone >= 1) {
                  return 'BLOCK;Offline Change non-MP to MP + max out 85%;OfflineAttemptChangeItemCategory';                
              }
          }
      }
  
  }
  
  /* ------------[Offline Rule] All Origination --> Offline Transaction with more than 3 Item above 1 Mio-------------*/
  if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (is_insurance_merchant == false) ) {
    if (sumTotalPayment < 1000000) {
        if (count_item_type_smartphone >= 3) {
            return 'BLOCK;Offline Transaction Attempt to Purchase More than 3 MP;OfflineAttemptPurchaseMultipleItem';
        }   
    }
}

/* ------------[Offline Rule] All Origination --> Offline Transaction with more than 2 Item above 1 Mio-------------*/
if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (is_insurance_merchant == false) ) {
    if (sumTotalPayment < 1000000) {
        if (count_item_type_smartphone >= 2) {
            return 'REJECT;Offline Transaction Attempt to Purchase 2 MP;OfflineAttemptPurchaseMultipleItem';
        }   
    }
}
  
  /* ------------[Offline Rule] Requesting Whitelisted Item and Purchasing Non Whitelisted Item (Reject Change Item Suspicious Behaviour)-------------*/
  if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_origination == true) && (is_offline_transaction == true) && (offline_item_category == 'smartphone') && (is_insurance_merchant == false) && (is_prj_merchants == false)) { 
  
      /*Reduce Blockrate for those who hv no transaction after X period */
      /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
      /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
      if (max_diff_transaction_creation_to_submit <= 1440 && (max_diff_transaction_creation_to_submit> -99 || days_since_last_trx > -99)) {
          /* Rule Logic
          Pass  : Whitelisted item --> Whitelisted Item
          Pass  : Whitelisted item --> Non-whitelisted Item <=13Mio
          Pass  : Whitelisted item --> Non-whitelisted Item >13Mio + ever make min. Payment >=500.000
          Reject: Whitelisted item --> Non-whitelisted Item >13Mio + never have payment
          */
          if ((sumTotalPayment < 500000) && (transactionAmount > 13000000) ) {
              /*Request Whitelisted Item --> Purchase Whitelist Item */
              if ((is_requested_item_offline_whitelisted_item == true) && (is_current_item_offline_whitelisted_item == false)) {
                  return 'REJECT;Requested Offline Whitelist item, transacted different item;DifferentItemName';
              } 
          }
      }
  }
  
  /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
  if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)) {
      /* ------------Offline origination and not transacting in offline store with no payment history (Prevent Online Max Out)-------------*/
      if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (adjusted_limit_utilization >=0.5) && (sumTotalPayment < 500000) && (total_limit_usage >= 13000000)) {
          return 'REJECT;Offline Origination Attempt to Maxout Online;OfflineAttemptMaxoutOnline';
      } 
      /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
      else if (
          (offline_item_names == 'Offline Transaction') /*ALDI*/
          && (sumTotalPayment <= 0) /*No payment*/
          && (adjusted_limit_utilization >= 0.7) /*Max out*/
          && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
      ) {
          return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
      }
  }
  
  /* ------------[Offline Rule] Offline origination and not transacting in offline store with no payment history (Prevent Secondary Online Max Out)-------------*/
  if ((creditLimitAccountScheme != 'INDODANA_GENERIC_SCHEME') && (is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false) ) {
      if (adjusted_limit_utilization >=0.5 && sumTotalPayment < 500000 && total_limit_usage >= 8000000) {
          return 'REJECT;Offline Origination Attempt to Maxout Secondary Online;OfflineAttemptMaxoutSecondaryOnline';
      }
  }

  /* ------------[Offline Rule] Handler for Change Store: Non-Bad to Bad Store-------------*/
  if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_origination == true) && (is_offline_transaction == true) && (is_insurance_merchant == false)) {
      if (sumTotalPayment < 500000 && is_initial_bad_store == false && is_current_bad_store == true) {
          if (adjusted_limit_utilization >=0.5  || total_limit_usage >= 13000000){
              return 'BLOCK;Offline Transaction Non Bad to Bad Store;OfflineAttemptChangeStoreCategory';
        }
    }
}
  
  /* ------------[Offline Rule] Limit QR Transaction to 1 Mio on Selected Merchants-------------*/
  for (qr_store: QR_MERCHANT_ONE_MIO) {
    if((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && (transactionAmount > 1000000) && stringUtils.contains(merchantName.toLowerCase(), qr_store)) {
        return 'REJECT;QR Payment Exceed Maximum Amount of 1 Mio;OfflineAttemptQR1Mio';
    }
  }

  /* ------------[Offline Rule] Limit QR Transaction to 2 Mio on Selected Merchants-------------*/
  for (qr_store: QR_MERCHANT_TWO_MIO) {
    if((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && (transactionAmount > 2000000) && stringUtils.contains(merchantName.toLowerCase(), qr_store)) {
        return 'REJECT;QR Payment Exceed Maximum Amount of 2 Mio;OfflineAttemptQR2Mio';
    }
  }
  
  /* turn this off as there are no more cases where there are no liveness test on Tiket
      if (
      (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME')
      && (identity_score < 480)
      && (transactionAmount >= 1000000) 
      && (adjusted_limit_utilization > 0.8) 
      && (sumTotalPayment <= 0) 
      ) {
          if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY')) {
              return "SUSPICIOUS;Suspect Fraud Tiket;SuspectFraud";
          } else {
              return "REJECT;Suspect Fraud Tiket New Account Maxout Low Identity;LowTransactionScore";
          }
  } */
  
  var ONLINE_MERCHANTS_INDODANA = [
      "TOKOPEDIA",
      "BELANJA DI TOKOPEDIA",
      "BUKALAPAK MARKETPLACE",
      "DIGITAL PRODUCTS BY CERMATI"
  ];
  
  if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
      if (ONLINE_MERCHANTS_INDODANA.contains(merchantName.toUpperCase()) || (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI '))){
          if ((trx_category == 'bad installed loan apps 14d') || (trx_category == 'bad installed loan apps 14d - for online trx')) {
              return "BLOCK;Bad installed loan apps 14d;InstalledApps"; 
          } else if (trx_score < 390) {
              return "BLOCK;transaction score < 390;LowTransactionScore"; 
          } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
              return "BLOCK;offline score < 380;LowOfflineScore"; 
          } else if (
              (trx_score < 420) 
              && (stringUtils.contains(itemNames.toLowerCase(), 'handphone'))
              && (is_tokopedia == 'false')
              && (max_diff_transaction_creation_to_submit >= 0)
              && (max_diff_transaction_creation_to_submit <= 168)
          ) {
              return "BLOCK;transaction score < 420, transact within 7d, buy phone;LowTransactionScore";
          } else if (
              (trx_score < 420)  
              && (discounted_sum_outstanding_late_1y_latest > 0)
          ) {
              return "BLOCK;transaction score < 420, latest FDC late;LowTransactionScore";
          } else if (
              (adjusted_limit_utilization >= 0.7)
              && (max_diff_transaction_creation_to_submit >= 0)
              && (max_diff_transaction_creation_to_submit <= 24)
              && (is_tokopedia == 'false')
          ) {
              return "BLOCK;limit utilization >= 0.7 within 24 hours after submit;HighLimitUtilization";
          } else if (stringUtils.contains(merchantName.toUpperCase(), 'BUKALAPAK MARKETPLACE')) {
              if (trx_score < 480) {
                  return "BLOCK;Bukalapak marketplace transaction score < 480;LowTransactionScore";
              } else if (isMainApplication == false) {
                  return "BLOCK;Bukalapak marketplace from secondary limit;BukalapakSecondaryLimit";
              } 
          } else if (stringUtils.contains(merchantName.toUpperCase(), 'DIGITAL PRODUCTS BY CERMATI')) {
              if (trx_score < 420) {
                  return "BLOCK;Digital Products by Cermati transaction score < 420;LowTransactionScore";
              } else if ((trx_score < 480) && (discounted_sum_outstanding_late_1y_latest > 0)) {
                  return "BLOCK;Digital Products by Cermati late FDC transaction score < 480;LowTransactionScore";
              } 
          } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI '))) {
              if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)
                    && (transactionAmount > sumTotalPayment) && (transactionAmount > 15000000) 
                    && (adjusted_limit_utilization > 0.9)) {
                  return "REJECT;CLI Offline Transact to VA > 15mio Max Out;OfflinetoVAMaxOut";
              } else if ((transactionAmount >= 15000000) && (trx_score) < 480) {
                  return "BLOCK;Transact VA High Amount >= 15mio and Low Score < 480;LowTransactionScore";
              } else if ((hasNonLimitActiveCashLoanContract == true)) {
                    if ((day_diff_trx_to_last_cash_disburse >= 0) && (day_diff_trx_to_last_cash_disburse <= 3)) {
                        return "BLOCK;Transact VA Within 3 Days After Disburse Cash;UserHasActiveCashLoan";   
                    } else if ((is_va_same_phone_number==0) && (transactionAmount>=20000000)) {
                        return "BLOCK;Active Cash Transact VA High Amount >= 20mio to Different Phone Number;UserHasActiveCashLoan";
                    } else if ((is_offline_origination == true) && (sumPaymentVaBeforeTrx<=0) && (adjusted_limit_utilization>=0.8)) {
                        return "BLOCK;Offline origination with active cash, no payment in VA and max out;UserHasActiveCashLoan";
                    }
              } else if (hasNonLimitActiveCashLoanContract == false) {
                    if ((adjusted_limit_utilization>0.9) && (fdcStatisticNumberOfInquiryId30d>10)) {
                        return "BLOCK;Transact VA Max Out > 90% and FDC Inquiry > 10;VAMaxOut";
                    }
              }
          }
      } else if (offline_transaction_applied_amount < 0) { /* additional rule for online origination */
          if (trx_category == 'bad installed loan apps 14d') {
              return "BLOCK;Bad installed loan apps 14d;InstalledApps"; 
          } 
      }
      
  } else if (
      (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME')
      || (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME')
  ) {
      if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME' && isMainApplication == true && trx_score < 390) {
          return "BLOCK;Blibli or Tiket transaction score < 390;LowTransactionScore";
      } else if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME' && merchantCategory == 'BLIBLI_INSTORE' && ((isOfficialStore == false) || (['-999'].contains(isOfficialStore))) && is_good_instore == false && trx_score < 440) {
          return "BLOCK;Blibli Instore transaction score < 440;LowTransactionScore";
      } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME' && trx_score < 390 && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
          return "BLOCK;Blibli or Tiket transaction score < 390;LowTransactionScore";
      } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
          return "BLOCK;offline score < 380;LowOfflineScore"; 
      } else if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (is_blibli_pln_transaction) && (riskGrade == 'A-') && (transactionAmount > 5000000)) {
          return "REJECT;PLN transaction amount > 5 Mio;HighTransactionAmount";
      } else if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (is_blibli_pln_transaction) && (riskGrade != 'A-') && (riskGrade != 'A+') && (transactionAmount > 2000000)) {
          return "REJECT;PLN transaction amount > 2 Mio;HighTransactionAmount";
      } else if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (isMainApplication == true) && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 6) && (adjusted_limit_utilization >= 0.8)) {
          return "BLOCK;Blibli Max Out >= 80% Within 6h After Submit;NewAccountMaxOut";
      } else if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") && (isMainApplication == false)) {
        if (trx_score < 420) {
            return "BLOCK;Secondary Blibli transaction score < 420;LowTransactionScore";
        }
        if ((max_diff_transaction_creation_to_submit >= 0) 
            && (max_diff_transaction_creation_to_submit <= 24) 
            && (adjusted_limit_utilization > 0.7)
        ) {
            return "BLOCK;Secondary Blibli Max Out > 70% Within 24h After Submit;NewAccountMaxOut";
        }
      }
  }
  
  if (
      creditLimitAccountScheme == "LINK_AJA_WHITELABEL_SCHEME" ||
      creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" ||
      creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME" || 
      creditLimitAccountScheme == "BUKALAPAK_WHITELABEL_SCHEME" ||
      creditLimitAccountScheme == "MITRA_BLIBLI_WHITELABEL_SCHEME"
  ) {
      return "NORMAL;Whitelabel Scheme";
  }
  
  return "NORMAL;Safe Transaction";