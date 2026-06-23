/**
 * nicknameValidator.ts
 * 닉네임에서 렌더링 이슈 및 XSS 위협 문자를 제거하는 모듈
 */

const ZERO_WIDTH_PATTERN =
  /[\u200B\u200C\u200D\u200E\u200F\u2060\u2061\u2062\u2063\u2064\uFEFF\u00AD]/g;

const INVISIBLE_CONTROL_PATTERN =
  /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\x80-\x9F\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;

const XSS_PATTERNS: RegExp[] = [
  /<[^>]*>/gi,                                 // HTML 태그
  /&(lt|gt|amp|quot|apos|#\d+|#x[\da-f]+);/gi, // HTML 엔티티
  /on\w+\s*=/gi,                               // 이벤트 핸들러 (onclick= 등)
  /javascript\s*:/gi,                          // javascript: 프로토콜
  /vbscript\s*:/gi,                            // vbscript: 프로토콜
  /data\s*:/gi,                                // data: 프로토콜
  /expression\s*\(/gi,                         // CSS expression()
  /[<>"'`]/g,                                  // 위험 문자 (따옴표 포함)
];

/**
 * 닉네임에서 모든 위협 문자를 제거하고 문자열만 반환
 *
 * @example
 * cleanNickname("홍\u200B길동")          // "홍길동"
 * cleanNickname("<script>name</script>") // "name"
 */
export function safeString(str: string): string {
  let result = str;

  result = result.replace(ZERO_WIDTH_PATTERN, "");
  result = result.replace(INVISIBLE_CONTROL_PATTERN, "");

  for (const pattern of XSS_PATTERNS) {
    pattern.lastIndex = 0;
    result = result.replace(pattern, "");
  }

  return result;
}