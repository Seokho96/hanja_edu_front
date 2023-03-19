import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

// const users = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: sample([ '첫째방', '둘째방' , '셋째방']),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer',
//   ]),
// }));

const users = {
  selHanja : [
    { id:'1', name:'첫째방',contents:[ '百 千 手 足 自 立 石' ] },
    { id:'2', name:'둘째방',contents:['生 心 出 入 工 力 川' ] },
    { id:'3', name:'셋째방',contents:['男 兄 金 天 江 目']  },
  ],
  bookHanja:[
    { id:'1', name:'첫째방',contents:[ '학습, 학년, 선심, 정직, 활동', '규칙, 교실, 안전, 준비, 자세', '중요, 정리, 정확, 체육'] },
    { id:'2', name:'둘째방',contents:['발음, 질문, 분명, 시, 문법', '상상, 장면, 실감, 체험, 역할, 민속' ] },
    { id:'3', name:'셋째방',contents:['모형, 배열, 삼각형, 원, 부호', '신호, 변, 계산, 시계, 계획','시간, 식, 오전, 오후, 선','방법, 환경, 자연']  },
  ],
  ancientHanja:[
    { id:'1', name:'첫째방',contents:[ '他山之石, 百發百中'] },
    { id:'2', name:'둘째방',contents:['作心三日, 男女老少' ] },
    { id:'3', name:'셋째방',contents:['此日彼日, 杜門不出']  },
  ]
}

export default users;
