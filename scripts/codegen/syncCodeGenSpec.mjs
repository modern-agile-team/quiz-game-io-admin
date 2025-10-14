import fs from 'fs';

// OpenAPI 스펙이 있는 URL
const SPEC_URL = {
  ADMIN: 'https://lsh.taild0f974.ts.net/backend/swagger/admin-json',
  API: 'https://lsh.taild0f974.ts.net/backend/swagger-json',
};

// 스펙을 저장할 파일 경로
const SPEC_WRITE_PATH = {
  ADMIN: 'src/lib/admins/spec.json',
  API: 'src/lib/apis/spec.json',
};

console.log('API 스펙을 가져오는 중...');

const getSpec = async (type) => {
  try {
    const response = await fetch(SPEC_URL[type]);
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    const data = await response.json();
    const jsonContent = JSON.stringify(data, null, 2);

    // 해당하는 폴더가 없으면 생성
    const dirPath = SPEC_WRITE_PATH[type].split('/').slice(0, -1).join('/');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 폴더가 생성되었습니다: ${dirPath}`);
    }

    fs.writeFileSync(SPEC_WRITE_PATH[type], jsonContent, 'utf8');
    console.log(`✅ [${type}] spec.json 파일이 성공적으로 저장되었습니다.`);
  } catch (error) {
    console.error(`❌ [${type}] 스펙 처리 중 에러 발생:`, error);
    throw error;
  }
};

// 병렬로 API와 SOCKET 스펙 가져오기
const results = await Promise.allSettled([getSpec('API'), getSpec('ADMIN')]);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`🎉 [${index}] 작업 성공`);
  } else {
    console.error(`💥 [${index}] 작업 실패:`, result.reason);
  }
});
