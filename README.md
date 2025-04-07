# 🌊 쇼핑몰 프로젝트
* Next.js + TypeScript 기반의 쇼핑몰 프로젝트입니다.
* Zustand로 상태 관리를 구현하고, 상품 목록, 상세 페이지, 장바구니, 주문자 입력, 관리자 등록을 구현하였습니다.


## 🛒 주요 기능
| 기능 | 설명 |
| :------: | :-------: |
| 상품 목록 | 상태 기반 상품 관리 + 필터링 |
| 상품 상세 페이지 | 클릭 시 상세 페이지로 이동 |
| 장바구니 | 수량 조절, 삭제, 결제 금액 합산 |
| 주문서 입력 | 이름/번호/주소 + 유효성 검사 |
| 상품 등록 | 이미지(base64), 설명 포함 등록 |
| 상품 수정/삭제 | 폼 자동 채움 → 수정 or 제거 |
| 상태 유지 | Zustand + localStorage 연동 |

## 📷 미리보기
<img width="918" alt="Image" src="https://github.com/user-attachments/assets/7ebf4e1b-d920-4559-b3f0-81d6f983f1df" />


## 기술 스택
* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Zustand (상태 관리)
* localStorage (데이터 유지)
* Vercel (배포)


## 실행 방법
```bash
git clone https://github.com/LBOMI/myShopping.git
cd myShopping
npm install
npm run dev
```
관리자 로그인 : 1234


## 배포 주소
👉 https://my-shopping-y4ya.vercel.app/


