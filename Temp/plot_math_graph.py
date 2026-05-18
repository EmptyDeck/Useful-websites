import numpy as np
import matplotlib.pyplot as plt

def draw_math_graph():
    # 폰트 설정 (Windows 기준 맑은 고딕 사용)
    plt.rcParams['font.family'] = 'Malgun Gothic'
    plt.rcParams['axes.unicode_minus'] = False

    # 1. 데이터 생성
    # 1. 데이터 생성
    # x < 0 구간: y = -0.1 (빨간색 선, -10부터 시작)
    x1 = np.linspace(-10, -0.01, 500)
    y1 = np.full_like(x1, -0.1)

    # 0 <= x <= 9 구간: 시그모이드 (x=0에서 정확히 1, 9 지점에서 수렴하며 절단됨)
    x2 = np.linspace(0, 9, 500)
    # y = 2 / (1 + exp(k * x)) 형태. k=0.6일 때 x=9에서 y 약 0.009 (수렴)
    k = 0.6  
    y2 = 2 / (1 + np.exp(k * x2))

    # x > 9 구간: y = -1 (검은색 선, 10까지 연장)
    x3 = np.linspace(9.01, 10, 300)
    y3 = np.full_like(x3, -1)

    # 2. 플롯 설정 (Aesthetic Design)
    plt.figure(figsize=(12, 7), facecolor='#fdfdfd')
    ax = plt.gca()
    ax.set_facecolor('#ffffff')
    
    # 그리드 설정
    plt.grid(True, linestyle='--', alpha=0.4, color='#cbd5e0')

    # 3. 그래프 그리기
    plt.plot(x1, y1, color='#e53e3e', linewidth=3, label='')
    plt.plot(x2, y2, color='#3182ce', linewidth=3, label='')
    plt.plot(x3, y3, color='#000000', linewidth=3, label='')

    # 4. 불연속 점 강조 (Open/Closed circle convention)
    # x=0 지점
    plt.scatter([0], [-0.1], facecolors='white', edgecolors='#e53e3e', s=60, zorder=5)
    plt.scatter([0], [1.0], color='#3182ce', s=60, zorder=5) # 정확히 1.0

    # x=9 지점 (사용자 요청에 따라 9로 미루고 수렴하도록 함)
    plt.scatter([9], [2 / (1 + np.exp(k * 9))], facecolors='white', edgecolors='#3182ce', s=60, zorder=5)
    plt.scatter([9], [-1], color='#000000', s=60, zorder=5)


    # 5. 축 및 가이드라인
    plt.axhline(0, color='#2d3748', linewidth=1.2, alpha=0.7) # X축 가이드라인을 초록색으로 변경
    plt.axvline(0, color='green', linewidth=1.2, alpha=0.7)
    
    # x축, y축 범위 고정 및 숫자 설정
    plt.xlim(-10, 10)
    plt.ylim(-1.19999, 1.19999)
    plt.xticks([]) # x축 숫자 제거
    # y축 범위 내에 있는 눈금만 표시
    plt.yticks([-1.0, -0.5, 0.0, 0.5, 1.0])

    
    # 6. 텍스트 및 라벨링
    plt.title('', fontsize=18, fontweight='bold', pad=25, color='#1a202c')

    plt.xlabel('Ground Truth', fontsize=13, fontweight='500', color='#4a5568')
    plt.ylabel('LADS Score', fontsize=13, fontweight='500', color='#4a5568')
    
    # 범례 설정 (선은 유지하되 텍스트는 빈 값으로 설정)
    plt.legend(["Before Ground Truth = -0.1", "After Ground Truth = Sigmoid", "After End of the Print = -1"], loc='upper right', fontsize=11, frameon=True, shadow=True, borderpad=0.8, handlelength=1.5)


    # 7. 스타일 마무리
    for spine_name, spine in ax.spines.items():
        if spine_name == 'bottom':
            spine.set_edgecolor('#cbd5e0') # 하단 x축 스파인을 초록색으로
        else:
            spine.set_edgecolor('#cbd5e0')

    
    plt.tight_layout()
    
    # 파일 저장
    output_path = 'math_graph.svg'
    plt.savefig(output_path, format='svg', bbox_inches='tight')
    print(f"그래프가 {output_path}로 저장되었습니다.")


    
    # plt.show() # 로컬 실행 시 활성화 가능

if __name__ == "__main__":
    draw_math_graph()
