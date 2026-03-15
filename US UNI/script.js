// 지원 프로그램 데이터
const USD_TO_KRW = 1477.897663; // As of 2026-03-12 05:39 UTC

function formatKRWFromUSD(usd) {
    const krw = usd * USD_TO_KRW;
    const man = Math.round(krw / 10000);
    if (man >= 10000) {
        const eok = Math.floor(man / 10000);
        const rest = man % 10000;
        return rest ? `${eok}억 ${rest.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${man.toLocaleString()}만원`;
}

function formatKRWApprox(usd) {
    return `약 ${formatKRWFromUSD(usd)}`;
}

function formatKRWRange(minUsd, maxUsd) {
    return `${formatKRWFromUSD(minUsd)}-${formatKRWFromUSD(maxUsd)}`;
}

const programs = [
    {
        id: 1,
        university: 'University of Illinois Urbana-Champaign - 전자공학과',
        program: '전자공학과 (ECE)',
        engineeringRank: 7,
        overallRank: 36,
        location: 'Illinois',
        accepted: false,
        logoFile: 'uiuc.svg',
        tuition: '$67,086',
        tuitionKRW: formatKRWFromUSD(67086),
        website: 'https://illinois.edu/',
        tuitionImage: 'illinois_cost.png',
        tuitionDetails: `<div class="tuition-breakdown">
            <h4>🎓 UIUC 전기 및 컴퓨터 공학(ECE) 석사 예상 비용 보고서</h4>
            <p class="note"><strong>기준:</strong> 2026년 가을 ~ 2027년 봄 (1년 / 2학기) | 국제 학생, 대학원생, 학기당 12학점 이수</p>
            
            <div class="total-cost">📍 연간 총 비용: <strong>$67,086.00</strong> (${formatKRWApprox(67086)})</div>
            
            <div class="cost-section">
                <h5>💰 1. 직접 교육비 (Tuition & Fees)</h5>
                <p style="font-size: 0.85em; color: #666; margin-bottom: 8px;">학교에 직접 납부해야 하는 필수 항목입니다.</p>
                <div class="cost-row"><span>수업료 (Tuition)</span><span>$40,444.00</span></div>
                <div class="cost-row total"><span><strong>필수 수수료 합계</strong></span><span><strong>$5,840.00</strong></span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>의료 보험</span><span>$2,250.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>AFMFA (학술 시설 유지비)</span><span>$758.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>서비스 수수료</span><span>$712.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>일반 수수료</span><span>$618.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>보건 서비스료</span><span>$518.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>도서관/IT 수수료</span><span>$512.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>학생 주도 수수료</span><span>$164.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>국제 학생 수수료</span><span>$160.00</span></div>
                <div class="cost-row" style="margin-left: 15px;"><span>교통비</span><span>$148.00</span></div>
            </div>
            
            <div class="cost-section">
                <h5>🏠 2. 간접 생활비 (Additional Expenses)</h5>
                <p style="font-size: 0.85em; color: #666; margin-bottom: 8px;">개인의 소비 습관에 따라 달라질 수 있는 추정 비용입니다.</p>
                <div class="cost-row"><span>식비 및 주거비</span><span>$16,512.00</span></div>
                <div class="cost-row"><span>교재 및 학용품</span><span>$1,200.00</span></div>
                <div class="cost-row"><span>기타 개인 비용</span><span>$3,090.00</span></div>
                <div class="cost-row total"><span><strong>생활비 소계</strong></span><span><strong>$20,802.00</strong></span></div>
            </div>
            
            <img src="illinois_cost.png" alt="UIUC Cost Breakdown" class="tuition-image">
        </div>`
    },
    {
        id: 2,
        university: 'Purdue University - 기계공학과',
        program: '기계공학과 (ME) - PhD',
        engineeringRank: 4,
        overallRank: 43,
        location: 'Indiana',
        accepted: false,
        logoFile: 'purdue_system.svg',
        tuition: '$0',
        tuitionKRW: '박사 지원',
        website: 'https://www.purdue.edu/',
        tuitionDetails: `<div class="tuition-breakdown">
            <h4>🎓 박사 과정 (PhD Program)</h4>
            <p class="note"><strong>펀딩 지원:</strong> 박사 과정은 일반적으로 학비가 면제됩니다.</p>
            
            <div class="total-cost">💰 예상 학비: <strong>$0</strong> (펀딩 지원)</div>
            
            <div class="important-note">
                <strong>📌 박사 과정 재정 지원 안내</strong>
                <ul>
                    <li><strong>학비 면제:</strong> 연구 장학금 또는 조교 장학금을 통해 학비 전액 면제</li>
                    <li><strong>생활비 지원:</strong> 월 급여 형태로 생활비 지원 (일반적으로 연간 $20,000~$35,000)</li>
                    <li><strong>건강 보험:</strong> 대부분의 경우 건강보험도 포함</li>
                    <li><strong>지원 조건:</strong> Research Assistantship (RA) 또는 Teaching Assistantship (TA) 수행</li>
                </ul>
            </div>
            
            <div class="cost-section">
                <h5>💵 개인 부담 예상 비용 (자비 부분)</h5>
                <div class="cost-row"><span>초기 정착 비용</span><span>~$2,000</span></div>
                <div class="cost-row"><span>교재 및 학용품 (연간)</span><span>~$1,000</span></div>
                <div class="cost-row"><span>개인 생활비 추가분</span><span>변동</span></div>
            </div>
            
            <p style="margin-top: 15px; color: #666; font-size: 0.9em;">※ 실제 펀딩 조건은 합격 통지서에 명시된 내용을 확인해야 합니다.</p>
        </div>`
    },
    {
        id: 3,
        university: 'Texas A&M University - 컴퓨터공학과',
        program: '컴퓨터공학과 (CS)',
        engineeringRank: 11,
        overallRank: 47,
        location: 'Texas',
        accepted: false,
        logoFile: 'texas_am.svg',
        tuition: '$52,611.60',
        tuitionKRW: formatKRWFromUSD(52611.6),
        website: 'https://www.tamu.edu/',
        tuitionImage: 'tamu_cost.png',
        tuitionDetails: `<div class="tuition-breakdown">
            <h4>📊 2025-2026학년도 대학원 공학 프로그램 예상 비용 (연간)</h4>
            <p class="note"><strong>기준:</strong> 2학기 (가을+봄) | 국제 학생, 교내 거주, 학기당 12학점 이수</p>
            
            <div class="total-cost">📍 연간 총 예상 비용: <strong>$52,611.60</strong> (${formatKRWApprox(52611.6)})</div>
            
            <div class="cost-section">
                <h5>💰 등록금 및 필수 수수료 (연간)</h5>
                <div class="cost-row"><span>수업료 및 필수 수수료</span><span>$22,945.60</span></div>
                <div class="cost-row"><span>대학원 공학 프로그램 수수료</span><span>$5,130.00</span></div>
                <div class="cost-row total"><span><strong>등록금 합계</strong></span><span><strong>$28,075.60</strong></span></div>
            </div>
            
            <div class="cost-section">
                <h5>📚 기타 예상 비용 (연간)</h5>
                <div class="cost-row"><span>교재 및 학용품</span><span>$1,306.00</span></div>
                <div class="cost-row"><span>주거 및 식비</span><span>$13,690.00</span></div>
                <div class="cost-row"><span>대출 수수료</span><span>$158.00</span></div>
                <div class="cost-row"><span>여행 경비</span><span>$4,266.00</span></div>
                <div class="cost-row"><span>개인 생활비</span><span>$5,116.00</span></div>
                <div class="cost-row total"><span><strong>기타 비용 합계</strong></span><span><strong>$24,536.00</strong></span></div>
            </div>
            
            <div class="important-note">
                <strong>⚠️ 별도 예산 책정 필요 (연간):</strong>
                <ul>
                    <li>국제 학생 서비스 수수료: $300 (학기당 $150 × 2)</li>
                    <li>국제 학생 건강 보험료: 약 $3,275 (여름 $252 + 가을 $1,010 + 봄 $2,013)</li>
                    <li>신입생 보증금: $100</li>
                    <li>오리엔테이션 수수료 등</li>
                </ul>
            </div>
            
            <img src="tamu_cost.png" alt="TAMU Cost Breakdown" class="tuition-image">
        </div>`
    },
    {
        id: 4,
        university: 'University of Texas at Austin - 컴퓨터공학과',
        program: '컴퓨터공학과 (CS)',
        engineeringRank: 10,
        overallRank: 32,
        location: 'Texas',
        accepted: false,
        logoFile: 'ut_austin.svg',
        tuition: '$43,690',
        tuitionKRW: formatKRWFromUSD(43690),
        website: 'https://www.utexas.edu/',
        tuitionImage: 'austin_cost.png',
        tuitionDetails: `<div class="tuition-breakdown">
            <h4>📊 2025-2026학년도 예상 출석 비용</h4>
            <p class="note"><strong>참고:</strong> 주거, 교통, 교재 및 개인 비용은 학부생 기준 학기당 12학점 이상, 대학원생 기준 9학점 이상 등록을 가정합니다.</p>
            
            <div class="total-cost">📍 총 예상 비용: <strong>$43,690</strong> (${formatKRWApprox(43690)})</div>
            
            <div class="cost-section">
                <h5>💰 비용 상세 내역</h5>
                <div class="cost-row"><span>등록금 (Tuition)</span><span>$19,320</span></div>
                <div class="cost-row"><span>주거비 (Housing)</span><span>$17,052</span></div>
                <div class="cost-row"><span>교통비 (Transportation)</span><span>$1,786</span></div>
                <div class="cost-row"><span>교재 및 학용품 (Books & Supplies)</span><span>$774</span></div>
                <div class="cost-row"><span>개인/기타 비용 (Personal/Misc)</span><span>$4,758</span></div>
            </div>
            
            <img src="austin_cost.png" alt="UT Austin Cost Breakdown" class="tuition-image">
        </div>`
    },
    {
        id: 5,
        university: 'Virginia Tech - 기계공학과',
        program: 'Engineering',
        engineeringRank: 13,
        overallRank: 47,
        location: 'Virginia',
        accepted: false,
        logoFile: 'virginia_tech.svg',
        tuition: '$55,000-65,000',
        tuitionKRW: formatKRWRange(55000, 65000),
        website: 'https://www.vt.edu/',
        tuitionDetails: `Virginia Tech의 정확한 2026년 가을 학기 컴퓨터 과학 석사 과정 학비는 문서에서 찾을 수 없습니다. 실제 학비는 거주자/비거주자 상태, 학위 프로그램에 따라 달라집니다. 예상 범위: $55,000-65,000 (약 ${formatKRWRange(55000, 65000)}). 재정 지원 사무실에 문의 권장.`
    },
    {
        id: 6,
        university: 'University of Colorado Boulder (CS)',
        program: 'Computer Science (CS)',
        engineeringRank: 35,
        overallRank: 60,
        location: 'Colorado',
        accepted: true,
        logoFile: 'uc_boulder.svg',
        tuition: '$37,466',
        tuitionKRW: formatKRWFromUSD(37466),
        website: 'https://www.colorado.edu/',
        tuitionDetails: `CU Boulder 컴퓨터 과학 석사(30학점) 학비는 총 $20,010입니다. 룸앤보드 $15,676, 서적 및 용품 $1,200, 신입생 수수료 $500, 이민 준수 수수료 $80. 총 예상 비용: $37,466 (${formatKRWApprox(37466)})`
    },
    {
        id: 7,
        university: 'University of Colorado Boulder (ECE)',
        program: 'Electrical & Computer Eng (ECE)',
        engineeringRank: 35,
        overallRank: 60,
        location: 'Colorado',
        accepted: false,
        logoFile: 'uc_boulder.svg',
        tuition: '$37,466',
        tuitionKRW: formatKRWFromUSD(37466),
        website: 'https://www.colorado.edu/',
        tuitionDetails: `CU Boulder 전기 컴퓨터 공학 석사 프로그램 예상 비용은 CS 프로그램과 유사합니다. 학비 $20,010, 룸앤보드 $15,676, 기타 비용 약 $1,780. 총 예상 비용: $37,466 (${formatKRWApprox(37466)})`
    },
    {
        id: 8,
        university: 'UC Davis',
        program: 'Engineering',
        engineeringRank: 34,
        overallRank: 28,
        location: 'California',
        accepted: false,
        logoFile: 'uc_davis.svg',
        tuition: '$98,690',
        tuitionKRW: formatKRWFromUSD(98690),
        website: 'https://www.ucdavis.edu/',
        tuitionDetails: `UC Davis 비거주자/국제 학생의 총 예상 비용은 $84,366~$93,358입니다. 학비 및 수수료 $54,953, 건강 보험 $7,446, 숙식비 $20,771, 서적 $1,463, 개인/교통 $3,194. 총 예상 비용: $98,690 (${formatKRWApprox(98690)})`
    },
    {
        id: 9,
        university: 'Iowa State University',
        program: 'Engineering',
        engineeringRank: 49,
        overallRank: 105,
        location: 'Iowa',
        accepted: true,
        logoFile: 'iowa_state.svg',
        tuition: '$51,208',
        tuitionKRW: formatKRWFromUSD(51208),
        website: 'https://www.iastate.edu/',
        tuitionDetails: `Iowa State 국제 대학원생의 2025-2026 학년도 학비 및 수수료는 9개월 기준 $32,496입니다. 생활비 $18,712(룸앤보드, 서적, 개인 경비, 건강 보험 포함). 총 예상 비용: $51,208 (${formatKRWApprox(51208)})`
    },
    {
        id: 10,
        university: 'Arizona State University',
        program: 'Engineering',
        engineeringRank: 48,
        overallRank: 115,
        location: 'Arizona',
        accepted: true,
        logoFile: 'asu.svg',
        tuition: '$69,113',
        tuitionKRW: formatKRWFromUSD(69113),
        website: 'https://www.asu.edu/',
        tuitionDetails: `Arizona State 2025-2026 석사 과정 비거주자 기준 총 예상 비용은 $69,113입니다. 학비 $37,085, 학비 할증료 $350, 등록금 $290, 숙식비 $20,460, 서적 $1,908, 교통 $3,564, 개인 $4,656. ${formatKRWApprox(69113)}`
    }
];

// DOM 요소 가져오기
const universityList = document.getElementById('university-list');

// 공과 순위대로 정렬 (이미 순서대로 되어있음)
programs.sort((a, b) => a.engineeringRank - b.engineeringRank);

// 각 프로그램 카드 생성
programs.forEach((program, index) => {
    const card = createProgramCard(program, index + 1);
    universityList.appendChild(card);
});

/**
 * 프로그램 카드 요소 생성
 */
function createProgramCard(program, displayIndex) {
    const card = document.createElement('div');
    card.className = `university-card ${program.accepted ? 'accepted' : ''}`;
    card.id = `card-${program.id}`;
    
    const statusIcon = program.accepted ? '✅' : '⏳';
    const statusText = program.accepted ? '합격!' : '대기 중';
    
    card.innerHTML = `
        <div class="card-number">${displayIndex}</div>
        <a href="${program.website}" target="_blank" class="university-logo-link">
            <div class="university-logo">
                <img src="${program.logoFile}" alt="${program.university}" onerror="loadFallbackLogo(this)">
            </div>
        </a>
        
        <div class="university-info">
            <h2>
                <a href="${program.website}" target="_blank" class="university-link">
                    ${program.university}
                </a>
            </h2>
            
            <div class="rank-info">
                <div class="rank-item">
                    <label>공과 순위</label>
                    <div class="rank-value">#${program.engineeringRank}</div>
                </div>
                <div class="rank-item">
                    <label>일반 순위</label>
                    <div class="rank-value">#${program.overallRank}</div>
                </div>
            </div>
            
            <div class="tuition-info" data-program-id="${program.id}">
                <div class="tuition-header">
                    <span class="tuition-label">📚 연간 학비 (추정)</span>
                    <span class="tuition-toggle">▼</span>
                </div>
                <div class="tuition-value">${program.tuition} / ${program.tuitionKRW}</div>
                <div class="tuition-details" style="display: none;">
                    ${program.tuitionDetails}
                </div>
            </div>
        </div>
        
        <div class="status-badge ${program.accepted ? 'accepted' : ''}">
            ${statusIcon} ${statusText}
        </div>
    `;
    
    // 학비 클릭 이벤트
    const tuitionInfo = card.querySelector('.tuition-info');
    tuitionInfo.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTuitionDetails(card, program.id);
    });
    
    // 마우스 호버 이벤트
    card.addEventListener('mouseenter', () => {
        if (program.accepted) {
            card.style.transform = 'translateX(10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (program.accepted) {
            card.style.transform = 'translateX(0) scale(1)';
        }
    });
    
    return card;
}

/**
 * 학비 설명 토글
 */
function toggleTuitionDetails(card, programId) {
    const tuitionDetails = card.querySelector('.tuition-details');
    const tuitionToggle = card.querySelector('.tuition-toggle');
    
    if (tuitionDetails.style.display === 'none') {
        tuitionDetails.style.display = 'block';
        tuitionToggle.textContent = '▲';
    } else {
        tuitionDetails.style.display = 'none';
        tuitionToggle.textContent = '▼';
    }
}

/**
 * SVG 로드 실패시 폴백
 */
function loadFallbackLogo(img) {
    // SVG 로드 실패하면 흰색 배경으로 표시
    img.style.display = 'none';
    img.parentElement.style.background = 'white';
    img.parentElement.style.border = '1px solid #ddd';
    img.parentElement.style.display = 'flex';
    img.parentElement.style.alignItems = 'center';
    img.parentElement.style.justifyContent = 'center';
    
    const text = document.createElement('div');
    text.style.color = '#667eea';
    text.style.fontSize = '24px';
    text.style.fontWeight = 'bold';
    text.style.textAlign = 'center';
    text.textContent = '🎓';
    img.parentElement.appendChild(text);
}

// 통계 업데이트
function updateStats() {
    const totalPrograms = programs.length;
    const acceptedCount = programs.filter(p => p.accepted).length;
    const acceptanceRate = Math.round((acceptedCount / totalPrograms) * 100);
    
    console.log(`📊 통계:`);
    console.log(`- 지원: ${totalPrograms}개`);
    console.log(`- 합격: ${acceptedCount}개`);
    console.log(`- 합격률: ${acceptanceRate}%`);
}

// 페이지 로드 시 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.university-card');
    cards.forEach((card, index) => {
        card.style.animation = `slideUp 0.5s ease-out ${0.05 * index}s both`;
    });
    
    updateStats();
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.university-card, .stat-card').forEach(el => {
    observer.observe(el);
});
