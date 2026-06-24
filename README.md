# 매슐랭

## 주제

매점에 있는 많은 음식과 음식 조합등을 확인하기 위해 만들었다

### 1 food main

창에 있는 아무 버튼이나 눌러도 바로 이동하게 설계
기능은 총 3개로 나눠 사용자가 보기 편한 UX디자인
간단한 디자인으로 사용자의 거부감 감소

### 2 food review

음식을 과자, 음료수, 냉동으로 분류하여 물건을 찾기 편하게 함
가격, 정보등을 표시하여 사용자가 판매 품목을 손쉽게 확인가능

### 3 food combo

음식 조합을 통해 다른 학생들의 꿀조합을 찾아 먹는 재미를 늘릴수 있음
매일 매일 색다른 조합으로 먹을수 있음
별점 시스템으로 높은 평점을 받은 조합은 신뢰도 상승

### 4 update

업데이트 로그로 업데이트된 소식등을 업로드

## api

### auth

POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/register
GET    /api/v1/auth/refresh

POST /api/v1/auth/login
request:
 body: { username: string, password: string }
 cookie: { }
response:
 body: { success: boolean, error?: { message: string }, result?: { userId: string, accessToken: string } }
 cookie: { refreshToken?: string HttpOnly Secure }
 status: 200, 400

POST /api/v1/auth/logout
request:
 body: { }
 cookie: { refreshToken: string }
response:
 body: { success: boolean, error?: { message: string } }
 cookie: { }
 status: 200, 400, 401

POST /api/v1/auth/register
request:
 body: { username: string, nickname: string, password: string }
 cookie: { }
response:
 body: { success: boolean, error?: { message: string }, result?: {userId: string, accessToken: string } }
 cookie: { refreshToken?: string HttpOnly Secure }
 status: 201, 400, 500

GET /api/v1/auth/refresh
request:
 body: { }
 cookie: { refreshToken: string }
response:
 body: { success: boolean, error?: { message: string }, result?: { accessToken: string } }
 cookie: { refreshToken: string HttpOnly Secure }
 status: 201, 400, 401

## 데이터베이스 스키마

[drawDB](https://www.drawdb.app/editor?shareId=13bd66b003e340e96179d91773f3e9e6)

### 사용자 관련 테이블

#### users

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| password | varchar | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |

#### usernames

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| userId | char | PK, NOT NULL | FK → users.id |
| username | varchar | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### nicknames

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| userId | char | PK, NOT NULL | FK → users.id |
| nickname | varchar | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### refresh_tokens

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| userId | char | NOT NULL | FK → users.id |
| token | varchar | NOT NULL | - |
| login_ip | varchar | NOT NULL | - |
| expire_at | timestamp | NOT NULL | - |

---

### 음식 관련 테이블

#### foods

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| creator | char | - | FK → users.id |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |

#### food_infos

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| foodId | char | PK, NOT NULL | FK → foods.id |
| name | varchar | NOT NULL | - |
| description | text | NOT NULL | - |
| price | integer | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### food_tags

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| foodId | char | PK, NOT NULL | FK → foods.id |
| tagId | char | PK, NOT NULL | FK → tags.id |
| updated_at | timestamp | NOT NULL | - |
| added_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### comments_food

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| userId | char | - | FK → users.id |
| foodId | char | NOT NULL | FK → foods.id |
| rating | decimal | NOT NULL | - |
| reason | text | NOT NULL | - |
| updated_at | timestamp | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

---

### 조합(조리법) 관련 테이블

#### combinations

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| creator | char | - | FK → users.id |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |

#### combination_infos

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| combinationId | char | PK, NOT NULL | FK → combinations.id |
| name | varchar | NOT NULL | - |
| description | text | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### combination_foods

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| combinationId | char | PK, NOT NULL | FK → combinations.id |
| foodId | char | PK, NOT NULL | FK → foods.id |
| updated_at | timestamp | NOT NULL | - |
| added_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### combination_tags

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| combinationId | char | PK, NOT NULL | FK → combinations.id |
| tagId | char | PK, NOT NULL | FK → tags.id |
| updated_at | timestamp | NOT NULL | - |
| added_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

#### comments_combination

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| userId | char | - | FK → users.id |
| combinationId | char | NOT NULL | FK → combinations.id |
| rating | decimal | NOT NULL | - |
| reason | text | NOT NULL | - |
| updated_at | timestamp | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

---

### 태그 관련 테이블

#### tags

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| id | char | PK, NOT NULL | - |
| creator | char | - | FK → users.id |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |

#### tag_infos

| 컬럼명 | 타입 | 제약조건 | 관계 |
| -------- | ------ | -------- | ----- |
| tagId | char | PK, NOT NULL | FK → tags.id |
| name | varchar | NOT NULL | - |
| description | text | NOT NULL | - |
| created_at | timestamp | NOT NULL | - |
| removed_at | timestamp | - | - |
| version | integer | PK, NOT NULL, DEFAULT: 1 | - |

---

### 스키마 요약

- **사용자 테이블**: 4개 (users, usernames, nicknames)
- **음식 테이블**: 4개 (foods, food_infos, food_tags, comments_food)
- **조합 테이블**: 4개 (combinations, combination_infos, combination_foods, combination_tags, comments_combination)
- **태그 테이블**: 2개 (tags, tag_infos)
- **총 외래키**: 18개
