// 지원 프로그램 데이터
const programs = [
    {
        id: 1,
        university: 'University of Illinois Urbana-Champaign (UIUC)',
        program: 'Engineering',
        engineeringRank: 7,
        overallRank: 36,
        location: 'Illinois',
        accepted: false,
        logoFile: 'uiuc.svg',
        tuition: '$59,328',
        tuitionKRW: '7,119만원',
        website: 'https://illinois.edu/',
        tuitionDetails: 'UIUC의 2026-2027학년도 Grainger Engineering 국제 학생 학비는 $40,444입니다. 룸앤보드 $15,184, 서적 및 비품 $1,200, 기타 비용 $2,500으로 예상됩니다. 총 예상 비용: $59,328 (약 7,119만원)'
    },
    {
        id: 2,
        university: 'Purdue University',
        program: 'Engineering',
        engineeringRank: 4,
        overallRank: 43,
        location: 'Indiana',
        accepted: false,
        logoFile: 'purdue_system.svg',
        tuition: '$64,531.50',
        tuitionKRW: '7,744만원',
        website: 'https://www.purdue.edu/',
        tuitionDetails: 'Purdue 컴퓨터 과학 석사 과정 학비는 $42,397.50입니다. 국제 학생 추가 등록금 $1,000, 숙식비 $16,734, 서적 등 $750, 교통비 $1,100, 기타 $2,550. 총 예상 비용: $64,531.50 (약 7,744만원)'
    },
    {
        id: 3,
        university: 'Texas A&M University',
        program: 'Engineering',
        engineeringRank: 11,
        overallRank: 47,
        location: 'Texas',
        accepted: false,
        logoFile: 'texas_am.svg',
        tuition: '$58,976',
        tuitionKRW: '7,077만원',
        website: 'https://www.tamu.edu/',
        tuitionDetails: 'Texas A&M의 비거주자/국제 학생 9개월 예상 비용은 약 $58,976입니다. 이 비용에는 학비 및 수수료, 숙식비, 서적, 교통비, 기타 경비가 포함됩니다. (약 7,077만원)'
    },
    {
        id: 4,
        university: 'University of Texas at Austin',
        program: 'Engineering',
        engineeringRank: 10,
        overallRank: 32,
        location: 'Texas',
        accepted: false,
        logoFile: 'ut_austin.svg',
        tuition: '$85,710',
        tuitionKRW: '1억 285만원',
        website: 'https://www.utexas.edu/',
        tuitionDetails: 'UT Austin MSISP(정보 보안 석사) 프로그램 기준 학비는 $63,000입니다(추가 독립 연구 과정 포함). 주거 및 식비 $17,300, 서적 $776, 개인/기타 $4,634. 총 예상 비용: $85,710 (약 1억 285만원)'
    },
    {
        id: 5,
        university: 'Virginia Tech',
        program: 'Engineering',
        engineeringRank: 13,
        overallRank: 47,
        location: 'Virginia',
        accepted: false,
        logoFile: 'virginia_tech.svg',
        tuition: '$55,000-65,000',
        tuitionKRW: '6,600-7,800만원',
        website: 'https://www.vt.edu/',
        tuitionDetails: 'Virginia Tech의 정확한 2026년 가을 학기 컴퓨터 과학 석사 과정 학비는 문서에서 찾을 수 없습니다. 실제 학비는 거주자/비거주자 상태, 학위 프로그램에 따라 달라집니다. 예상 범위: $55,000-65,000 (약 6,600-7,800만원). 재정 지원 사무실에 문의 권장.'
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
        tuitionKRW: '4,496만원',
        website: 'https://www.colorado.edu/',
        tuitionDetails: 'CU Boulder 컴퓨터 과학 석사(30학점) 학비는 총 $20,010입니다. 룸앤보드 $15,676, 서적 및 용품 $1,200, 신입생 수수료 $500, 이민 준수 수수료 $80. 총 예상 비용: $37,466 (약 4,496만원)'
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
        tuitionKRW: '4,496만원',
        website: 'https://www.colorado.edu/',
        tuitionDetails: 'CU Boulder 전기 컴퓨터 공학 석사 프로그램 예상 비용은 CS 프로그램과 유사합니다. 학비 $20,010, 룸앤보드 $15,676, 기타 비용 약 $1,780. 총 예상 비용: $37,466 (약 4,496만원)'
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
        tuitionKRW: '1억 1,843만원',
        website: 'https://www.ucdavis.edu/',
        tuitionDetails: 'UC Davis 비거주자/국제 학생의 총 예상 비용은 $84,366~$93,358입니다. 학비 및 수수료 $54,953, 건강 보험 $7,446, 숙식비 $20,771, 서적 $1,463, 개인/교통 $3,194. 총 예상 비용: $98,690 (약 1억 1,843만원)'
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
        tuitionKRW: '6,145만원',
        website: 'https://www.iastate.edu/',
        tuitionDetails: 'Iowa State 국제 대학원생의 2025-2026 학년도 학비 및 수수료는 9개월 기준 $32,496입니다. 생활비 $18,712(룸앤보드, 서적, 개인 경비, 건강 보험 포함). 총 예상 비용: $51,208 (약 6,145만원)'
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
        tuitionKRW: '8,294만원',
        website: 'https://www.asu.edu/',
        tuitionDetails: 'Arizona State 2025-2026 석사 과정 비거주자 기준 총 예상 비용은 $69,113입니다. 학비 $37,085, 학비 할증료 $350, 등록금 $290, 숙식비 $20,460, 서적 $1,908, 교통 $3,564, 개인 $4,656. 약 8,294만원'
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
