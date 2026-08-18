// DutchPay i18n — English (default) & Korean

window.DUTCH_CATS_DATA = [
  { id:"food",    en:"Food",     ko:"식비", enGlyph:"F", koGlyph:"식" },
  { id:"stay",    en:"Stay",     ko:"숙박", enGlyph:"S", koGlyph:"숙" },
  { id:"transit", en:"Transit",  ko:"교통", enGlyph:"T", koGlyph:"교" },
  { id:"tickets", en:"Tickets",  ko:"티켓", enGlyph:"K", koGlyph:"표" },
  { id:"shop",    en:"Shopping", ko:"쇼핑", enGlyph:"H", koGlyph:"쇼" },
  { id:"other",   en:"Other",    ko:"기타", enGlyph:"O", koGlyph:"기" },
];

window.DUTCH_I18N = {
  en: {
    // meta
    langCode: "en",
    langName: "English",
    otherLangName: "한국어",

    // app shell
    appTitle: "DutchPay",
    groupManagement: "Group Management",
    eyebrow: "expense tracker",

    // groups dashboard
    newGroup: "New Group",
    noGroups: "No groups yet",
    noGroupsHint: "Tap + below to create your first group!",
    membersUnit: (n) => `${n} member${n !== 1 ? "s" : ""}`,
    expensesUnit: (n) => `${n} expense${n !== 1 ? "s" : ""}`,

    // group card actions
    editGroup: "Edit",
    deleteGroup: "Delete",
    deleteGroupConfirm: (name) => `Delete "${name}"?\nAll expense data will be permanently removed.`,
    deleteGroupWarn: "All expense data will be removed.",

    // group form
    createGroup: "Create Group",
    editGroupTitle: "Edit Group",
    groupName: "Group Name",
    groupNamePlaceholder: "e.g. Jeju Trip, Roommates...",
    addMemberLabel: "Add Members",
    memberNamePlaceholder: "Enter name, then Add or Enter...",
    add: "Add",
    settlementHub: "Settlement Hub",
    settlementHubHint: "All settlements are routed through this member.",
    noMembersHint: "Add at least one member",
    memberCountUnit: (n) => `${n} member${n !== 1 ? "s" : ""}`,

    // settings
    settings: "Settings",
    tabPassword: "Password",
    tabRates: "Rates",
    tabLanguage: "Language",
    tabAbout: "About",

    // password settings
    passwordOn: "✓ Password is set. Required to edit or delete expenses.",
    passwordOff: "⚠ No password. Anyone can edit or delete expenses.",
    currentPassword: "Current Password",
    newPassword: "New Password",
    newPasswordPlaceholder: "Leave blank to remove password",
    confirmPassword: "Confirm Password",
    changePassword: "Change",
    passwordMismatch: "New passwords don't match.",
    passwordWrongOld: "Current password is incorrect.",
    passwordChanged: "Password changed successfully.",
    passwordRemoved: "Password removed.",
    saving: "Saving...",

    // rate settings
    ratesHint: "Live rates are fetched automatically when online.\nFallback rates below are used when offline.",
    usdRate: "$1 USD in KRW",
    eurRate: "€1 EUR in KRW",
    saveRates: "Save",
    ratesSaved: "Default rates saved.",
    ratesInvalid: "Please enter valid rate values.",

    // language settings
    globalLanguage: "App Language",
    globalLanguageHint: "Default language for all groups. Individual groups can override this.",
    groupLanguage: "Group Language",
    groupLanguageHint: "Override the app language for this group only.",
    useGlobal: "Use app default",
    langEn: "English",
    langKo: "한국어",
    languageSaved: "Language updated.",

    // about
    aboutName: "DutchPay — Group Expense Tracker",
    aboutFeatures: "Multiple groups, expense tracking, settlement, live exchange rates, receipt photos",
    aboutRates: "Frankfurter API (live, 1hr cache)",
    aboutStorage: "Local server (groups.json, expenses_*.json)",
    aboutLabel: "Feature",
    aboutKey: (k) => k,

    // group page
    groupExpenses: "Group Expenses",
    viewingAs: "Viewing as",
    isOwedStatus: "is owed",
    owesStatus: "owes",
    settledStatus: "settled",
    totalLabel: "Total",
    settleUpBtn: (n) => n > 0 ? `Settle up · ${n}` : "Settle up",
    whoOwesWho: "Balances",
    owedLabel: "owed",
    owesLabel: "owes",
    settledLabel: "settled",
    spendingLabel: "Spending",
    byCategoryLabel: "By Category",
    expensesLabel: "Expenses",
    expenseCount: (n) => `${n}`,
    noExpenses: "No expenses yet",
    noExpensesHint: "Tap + to start tracking expenses.",
    noResults: "No results",
    noResultsHint: "Try a different keyword or category.",
    addExpenseBtn: "Add",

    // expense form
    addExpenseTitle: "New Expense",
    editExpenseTitle: "Edit Expense",
    whatFor: "What for?",
    whatForPlaceholder: "e.g. Lunch, Taxi, Hotel...",
    howMuch: "How much?",
    dateTimeLabel: "Date & Time",
    categoryLabel: "Category",
    whoPaidLabel: "Who paid?",
    splitBetweenLabel: "Split between",
    allBtn: "All",
    noneBtn: "None",
    perPersonLabel: "per person",
    peopleUnit: (n) => `${n} ${n !== 1 ? "people" : "person"}`,
    pickAtLeastOne: "Pick at least one person",
    notesLabel: "Notes (optional)",
    notesPlaceholder: "Extra notes...",
    receiptPhoto: "Receipt Photo",
    addPhoto: "Add Photo",
    removePhoto: "✕ Remove",
    saveExpense: "Save",
    saveChanges: "Save Changes",
    saveFailed: "Save failed — check server connection",

    // expense row
    paidByLabel: "Paid by",
    splitBetweenRow: "Split between",
    amountLabel: "Amount",
    eachOwesLabel: "Each owes",
    editBtn: "Edit",
    deleteBtn: "Delete",
    deleteConfirm: (title) => `Delete "${title}"?`,

    // settle up
    settleUpTitle: "Settle Up",
    paymentsNeeded: (n) => `${n} payment${n !== 1 ? "s" : ""} to clear the balance`,
    payInLabel: "Pay in",
    markPaidBtn: "Mark paid",
    allEvenTitle: "All settled!",
    allEvenSub: "No payments needed. Nice work 🎉",

    // person detail
    paidStat: "Paid",
    shareStat: "Share",
    entriesStat: "Entries",
    involvedTitle: "Involved in",
    isOwedDetail: "is owed",
    owesDetail: "owes group",
    settledDetail: "all settled",

    // search / filter / sort
    searchPlaceholder: "Search expenses...",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortAmountDesc: "Highest",
    sortAmountAsc: "Lowest",
    allCats: "All",

    // toast
    toastAdded: (title) => `Added: ${title}`,

    // ccy status
    ccyLive: "Live",
    ccyUpdating: "Updating",
    ccyOffline: "Offline",
    ccyLoading: "Loading",
    ccyCached: (ago) => ago ? `Cached ${ago}` : "Cached",

    // rel time
    relJustNow: "just now",
    relSec: (n) => `${n}s ago`,
    relMin: (n) => `${n}m ago`,
    relHour: (n) => `${n}h ago`,
    relDay: (n) => `${n}d ago`,

    // date format
    formatWhen: (d) => d.toLocaleString("en-US", { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit", hour12:false }),

    // password modal
    passwordModalTitle: "Enter Password",
    passwordModalPlaceholder: "Password",
    passwordModalWrong: "Wrong password",
    passwordModalChecking: "Checking...",
    passwordModalConfirm: "Confirm",

    // group settings sheet
    groupSettingsTitle: "Group Settings",
    tabMembers: "Members",
    tabAppSettings: "Settings",
    newMemberPlaceholder: "New member name...",
    removeMemberConfirm: (name) => `Remove "${name}"?`,
    pwSubtitle: "Change Password",
    ratesSubtitle: "Default Rates (offline fallback)",

    // back button
    backToGroups: "Groups",

    // lock screens / auth
    adminGateTitle: "Owner Access",
    adminGateHint: "The group dashboard is private. Enter the owner password to see all groups.",
    groupGateTitle: "This group is locked",
    groupGateHint: "Enter the group password to continue. Ask a group member if you don't know it.",
    unlockBtn: "Unlock",
    backPwTitle: "Owner password required",
    backPwHint: "Only the owner can go back to the full group list.",

    // group password (form + settings)
    groupPasswordLabel: "Group Password (optional)",
    groupPasswordPlaceholder: "Leave blank for no password",
    groupPasswordKeep: "Leave blank to keep the current password",
    groupPasswordHint: "If set, anyone opening the group link must enter this password. Share it with group members.",
    tabGroupPw: "Password",
    groupPwOn: "✓ This group has a password. Visitors must enter it to open the group link.",
    groupPwOff: "⚠ No group password. Anyone with the link can open this group.",
    groupPwNew: "New group password",
    groupPwSave: "Save",
    groupPwRemove: "Remove password",
    groupPwSaved: "Group password saved.",
    groupPwRemoved: "Group password removed.",
    groupPwFailed: "Failed to save. Check server connection.",

    // loading
    loadingText: "Loading...",
  },

  ko: {
    // meta
    langCode: "ko",
    langName: "한국어",
    otherLangName: "English",

    // app shell
    appTitle: "더치페이",
    groupManagement: "그룹 관리",
    eyebrow: "지출 추적기",

    // groups dashboard
    newGroup: "새 그룹",
    noGroups: "그룹이 없습니다",
    noGroupsHint: "아래 + 버튼으로 첫 번째 그룹을 만들어보세요!",
    membersUnit: (n) => `${n}명`,
    expensesUnit: (n) => `${n}개 지출`,

    // group card actions
    editGroup: "수정",
    deleteGroup: "삭제",
    deleteGroupConfirm: (name) => `"${name}"을 삭제할까요?\n모든 지출 데이터가 영구 삭제됩니다.`,
    deleteGroupWarn: "모든 지출 데이터가 삭제됩니다.",

    // group form
    createGroup: "그룹 생성",
    editGroupTitle: "그룹 수정",
    groupName: "그룹 이름",
    groupNamePlaceholder: "예: 제주도 여행, 룸메이트...",
    addMemberLabel: "멤버 추가",
    memberNamePlaceholder: "이름 입력 후 추가 또는 Enter...",
    add: "추가",
    settlementHub: "정산 기준 멤버",
    settlementHubHint: "모든 정산이 이 멤버 기준으로 계산됩니다.",
    noMembersHint: "멤버를 한 명 이상 추가해주세요",
    memberCountUnit: (n) => `${n}명`,

    // settings
    settings: "설정",
    tabPassword: "비밀번호",
    tabRates: "기본 환율",
    tabLanguage: "언어",
    tabAbout: "정보",

    // password settings
    passwordOn: "✓ 비밀번호가 설정되어 있습니다. 지출 수정·삭제 시 입력이 필요합니다.",
    passwordOff: "⚠ 비밀번호 없음. 누구나 지출을 수정·삭제할 수 있습니다.",
    currentPassword: "현재 비밀번호",
    newPassword: "새 비밀번호",
    newPasswordPlaceholder: "비워두면 비밀번호 제거",
    confirmPassword: "비밀번호 확인",
    changePassword: "변경",
    passwordMismatch: "새 비밀번호가 일치하지 않습니다.",
    passwordWrongOld: "기존 비밀번호가 틀렸습니다.",
    passwordChanged: "비밀번호가 변경되었습니다.",
    passwordRemoved: "비밀번호가 제거되었습니다.",
    saving: "저장 중...",

    // rate settings
    ratesHint: "인터넷 연결 시 실시간 환율이 자동 적용됩니다.\n오프라인 시 아래 기본 환율을 사용합니다.",
    usdRate: "$1 달러 = ? 원 (KRW)",
    eurRate: "€1 유로 = ? 원 (KRW)",
    saveRates: "저장",
    ratesSaved: "기본 환율이 저장되었습니다.",
    ratesInvalid: "올바른 환율 값을 입력해주세요.",

    // language settings
    globalLanguage: "앱 언어",
    globalLanguageHint: "모든 그룹의 기본 언어입니다. 그룹별로 별도 지정도 가능합니다.",
    groupLanguage: "그룹 언어",
    groupLanguageHint: "이 그룹에만 다른 언어를 적용합니다.",
    useGlobal: "앱 기본값 사용",
    langEn: "English",
    langKo: "한국어",
    languageSaved: "언어가 변경되었습니다.",

    // about
    aboutName: "더치페이 — 그룹 지출 관리",
    aboutFeatures: "여러 그룹 생성, 지출 추적, 정산 계산, 실시간 환율, 영수증 사진",
    aboutRates: "Frankfurter API (실시간, 1시간 캐시)",
    aboutStorage: "로컬 서버 (groups.json, expenses_*.json)",

    // group page
    groupExpenses: "그룹 지출",
    viewingAs: "내 기준으로 보기",
    isOwedStatus: "받을 금액",
    owesStatus: "줄 금액",
    settledStatus: "정산 완료",
    totalLabel: "총 지출",
    settleUpBtn: (n) => n > 0 ? `정산하기 · ${n}건` : "정산하기",
    whoOwesWho: "누가 얼마를",
    owedLabel: "받을 돈",
    owesLabel: "줄 돈",
    settledLabel: "완료",
    spendingLabel: "지출 현황",
    byCategoryLabel: "카테고리별",
    expensesLabel: "지출 내역",
    expenseCount: (n) => `${n}건`,
    noExpenses: "지출이 없습니다",
    noExpensesHint: "+ 버튼으로 지출을 추가해보세요.",
    noResults: "검색 결과 없음",
    noResultsHint: "다른 키워드나 카테고리를 시도해보세요.",
    addExpenseBtn: "지출 추가",

    // expense form
    addExpenseTitle: "지출 추가",
    editExpenseTitle: "지출 수정",
    whatFor: "무엇에 썼나요?",
    whatForPlaceholder: "예: 점심, 택시, 편의점...",
    howMuch: "얼마를?",
    dateTimeLabel: "날짜 · 시간",
    categoryLabel: "카테고리",
    whoPaidLabel: "결제자",
    splitBetweenLabel: "나눌 멤버",
    allBtn: "전체",
    noneBtn: "없음",
    perPersonLabel: "1인당",
    peopleUnit: (n) => `${n}명`,
    pickAtLeastOne: "한 명 이상 선택해주세요",
    notesLabel: "메모 (선택)",
    notesPlaceholder: "추가 메모...",
    receiptPhoto: "영수증 사진",
    addPhoto: "사진 추가",
    removePhoto: "✕ 제거",
    saveExpense: "저장",
    saveChanges: "변경사항 저장",
    saveFailed: "저장 실패 — 서버 연결을 확인하세요",

    // expense row
    paidByLabel: "결제자",
    splitBetweenRow: "나눈 멤버",
    amountLabel: "금액",
    eachOwesLabel: "1인당",
    editBtn: "수정",
    deleteBtn: "삭제",
    deleteConfirm: (title) => `"${title}" 삭제할까요?`,

    // settle up
    settleUpTitle: "정산하기",
    paymentsNeeded: (n) => `${n}건 정산 필요`,
    payInLabel: "결제 화폐",
    markPaidBtn: "결제 완료",
    allEvenTitle: "모두 정산 완료!",
    allEvenSub: "지불할 금액이 없습니다. 수고하셨습니다 🎉",

    // person detail
    paidStat: "결제액",
    shareStat: "부담액",
    entriesStat: "항목 수",
    involvedTitle: "참여 내역",
    isOwedDetail: "받을 돈",
    owesDetail: "줄 돈",
    settledDetail: "정산 완료",

    // search / filter / sort
    searchPlaceholder: "지출 검색...",
    sortNewest: "최신순",
    sortOldest: "오래된순",
    sortAmountDesc: "금액 큰순",
    sortAmountAsc: "금액 작은순",
    allCats: "전체",

    // toast
    toastAdded: (title) => `추가됨: ${title}`,

    // ccy status
    ccyLive: "실시간",
    ccyUpdating: "업데이트 중",
    ccyOffline: "오프라인",
    ccyLoading: "로딩 중",
    ccyCached: (ago) => ago ? `${ago} 캐시` : "캐시됨",

    // rel time
    relJustNow: "방금 전",
    relSec: (n) => `${n}초 전`,
    relMin: (n) => `${n}분 전`,
    relHour: (n) => `${n}시간 전`,
    relDay: (n) => `${n}일 전`,

    // date format
    formatWhen: (d) => {
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const h = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      return `${m}월 ${day}일 ${h}:${min}`;
    },

    // password modal
    passwordModalTitle: "비밀번호 확인",
    passwordModalPlaceholder: "비밀번호 입력",
    passwordModalWrong: "비밀번호가 틀렸습니다",
    passwordModalChecking: "확인 중...",
    passwordModalConfirm: "확인",

    // group settings sheet
    groupSettingsTitle: "그룹 설정",
    tabMembers: "멤버 관리",
    tabAppSettings: "앱 설정",
    newMemberPlaceholder: "새 멤버 이름...",
    removeMemberConfirm: (name) => `"${name}" 멤버를 제거할까요?`,
    pwSubtitle: "비밀번호 변경",
    ratesSubtitle: "기본 환율 (오프라인 시 사용)",

    // back button
    backToGroups: "그룹 목록",

    // lock screens / auth
    adminGateTitle: "관리자 전용",
    adminGateHint: "그룹 대시보드는 비공개입니다. 관리자 비밀번호를 입력하면 전체 그룹을 볼 수 있습니다.",
    groupGateTitle: "잠긴 그룹입니다",
    groupGateHint: "그룹 비밀번호를 입력해주세요. 모르면 그룹 멤버에게 물어보세요.",
    unlockBtn: "잠금 해제",
    backPwTitle: "관리자 비밀번호 필요",
    backPwHint: "전체 그룹 목록은 관리자만 볼 수 있습니다.",

    // group password (form + settings)
    groupPasswordLabel: "그룹 비밀번호 (선택)",
    groupPasswordPlaceholder: "비워두면 비밀번호 없음",
    groupPasswordKeep: "비워두면 기존 비밀번호 유지",
    groupPasswordHint: "설정하면 그룹 링크를 열 때 이 비밀번호가 필요합니다. 그룹 멤버들과 공유하세요.",
    tabGroupPw: "비밀번호",
    groupPwOn: "✓ 그룹 비밀번호가 설정되어 있습니다. 링크를 열 때 입력이 필요합니다.",
    groupPwOff: "⚠ 그룹 비밀번호 없음. 링크만 있으면 누구나 열 수 있습니다.",
    groupPwNew: "새 그룹 비밀번호",
    groupPwSave: "저장",
    groupPwRemove: "비밀번호 제거",
    groupPwSaved: "그룹 비밀번호가 저장되었습니다.",
    groupPwRemoved: "그룹 비밀번호가 제거되었습니다.",
    groupPwFailed: "저장 실패 — 서버 연결을 확인하세요.",

    // loading
    loadingText: "불러오는 중...",
  },
};
