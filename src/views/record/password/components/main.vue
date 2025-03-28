<template>
  <div class="main">
    <a-typography-title :heading="2">社工密码生成器</a-typography-title>
    
    <div class="alert-info">
      <a-alert type="info">
        <template #icon><icon-info-circle /></template>提示
        所有输入框均是选填, 尽量减少无效输入以避免生成结果过多
      </a-alert>
    </div>

    <div class="form-container">
      <a-form :model="formData" layout="horizontal">
        <a-form-item label="姓名">
          <a-space direction="horizontal">
            <a-input v-model="formData.firstName" placeholder="请输入姓(英文)" />
            <a-input v-model="formData.secondName" placeholder="请输入名的第一个字(英文)" />
            <a-input v-model="formData.thirdName" placeholder="请输入名的第二个字(如果有，英文)" />
          </a-space>
        </a-form-item>

        <a-form-item label="生日">
          <a-space direction="horizontal">
            <a-date-picker v-model="formData.birthday" placeholder="公历生日" />
            <a-date-picker v-model="formData.birthday2" placeholder="农历生日" />
          </a-space>
        </a-form-item>

        <a-form-item label="邮件">
          <a-input v-model="formData.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="电话">
          <a-space direction="horizontal">
            <a-input v-model="formData.mobile" placeholder="请输入座机号,不要-号" />
            <a-input v-model="formData.telephone" placeholder="请输入手机号" />
          </a-space>
        </a-form-item>

        <a-form-item label="用户名">
          <a-space direction="horizontal">
            <a-input v-model="formData.username" placeholder="请输入用户名(英文)" />
            <a-input v-model="formData.account" placeholder="请输入用户账号" />
          </a-space>
        </a-form-item>

        <a-form-item label="组织">
          <a-space direction="horizontal">
            <a-input v-model="formData.organization" placeholder="请输入组织名(英文)" />
            <a-input v-model="formData.company" placeholder="请输入公司名(英文)" />
          </a-space>
        </a-form-item>

        <a-form-item label="短语">
          <a-input v-model="formData.likeUse" placeholder="请输入常用短语(英文),如iloveyou,多个用逗号分隔" />
        </a-form-item>

        <a-form-item label="身份证号">
          <a-input v-model="formData.idCard" placeholder="请输入身份证号" />
        </a-form-item>

        <a-form-item label="工号">
          <a-input v-model="formData.workNo" placeholder="请输入工号" />
        </a-form-item>

        <a-form-item label="连接符">
          <a-space direction="horizontal">
            <label style="width: 30px;">左</label>
            <a-switch v-model="formData.connectorLeft" />
            <label style="width: 30px;">中</label>
            <a-switch v-model="formData.connectorMiddle" />
            <label style="width: 30px;">右</label>
            <a-switch v-model="formData.connectorRight" />
            <a-input v-model="formData.connector" style="width: 500px;" placeholder="请输入连接符(如.!_-#@:$&*~?%+=/|),尽量减少,否则会极大增加密码数量" />
          </a-space>
        </a-form-item>

        <a-form-item label="常用词组">
          <a-input v-model="formData.common" style="width: 800px;" placeholder="请输入常用词组,如123456,abcd等，多个用逗号分隔" />
        </a-form-item>

        <a-form-item label="最近年份">
          <a-space direction="horizontal">
            <a-switch v-model="formData.haveYear" />
            <a-input v-model="formData.year" style="width: 100px;" placeholder="最近几年的年份,如果要特定年份可以输入到常用词组中" />
          </a-space>
        </a-form-item>

        <a-form-item label="去掉纯数字">
          <a-switch v-model="formData.numberFilter" />
        </a-form-item>

        <a-form-item label="去掉纯字母">
          <a-switch v-model="formData.stringFilter" />
        </a-form-item>

        <a-form-item label="长度">
          <a-space direction="horizontal">
            <label style="width: 80px;">不能小于</label>
            <a-input-number v-model="formData.short" style="width: 100px;" :min="0" :max="32" placeholder="最小长度" />
            <label style="width: 60px;">不能大于</label>
            <a-input-number v-model="formData.long" style="width: 100px;" :min="0" :max="32" placeholder="最大长度" />
          </a-space>
        </a-form-item>

        <a-form-item label="大小写">
          <a-space direction="horizontal">
            <label style="width: 80px;">首字母大写</label>
            <a-switch v-model="formData.capitalize" />
            <label style="width: 50px;">全小写</label>
            <a-switch v-model="formData.lowercase" />
            <label style="width: 50px;">全大写</label>
            <a-switch v-model="formData.uppercase" />
          </a-space>
        </a-form-item>

        <a-form-item>
          <a-space direction="horizontal" style="margin: 20px 0 0 50px;">
            <a-button type="primary" @click="generatePasswords">生成密码</a-button>
            <a-button @click="resetForm">重置</a-button>
            <a-button @click="downloadPasswords">下载</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <div v-if="showResults" class="results-container">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card title="单项信息密码">
            <template #extra>
              <a-button type="text" @click="copyResults('first')">复制</a-button>
            </template>
            <a-textarea v-model="results.first" :rows="10" readonly />
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="两项信息密码">
            <template #extra>
              <a-button type="text" @click="copyResults('second')">复制</a-button>
            </template>
            <a-textarea v-model="results.second" :rows="10" readonly />
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="两项信息加连接符密码">
            <template #extra>
              <a-button type="text" @click="copyResults('third')">复制</a-button>
            </template>
            <a-textarea v-model="results.third" :rows="10" readonly />
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="全部密码">
            <template #extra>
              <a-button type="text" @click="copyResults('all')">复制</a-button>
            </template>
            <a-textarea v-model="results.all" :rows="10" readonly />
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-spin v-if="loading" class="loading-spinner" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconInfoCircle } from '@arco-design/web-vue/es/icon';

const formData = reactive({
  firstName: '',
  secondName: '',
  thirdName: '',
  birthday: '',
  birthday2: '',
  email: '',
  mobile: '',
  telephone: '',
  username: '',
  account: '',
  organization: '',
  company: '',
  likeUse: '',
  idCard: '',
  workNo: '',
  connector: '',
  connectorLeft: false,
  connectorMiddle: false,
  connectorRight: false,
  common: '123,888,666,000,111,aaa,abc,qaz,qwe,asd,zxc,!@#,1234,1qaz,qwer,asdf,zxcv,!@#$,1357,2468,0123,6789,6666,8888,12345,123456',
  haveYear: false,
  year: 10,
  numberFilter: false,
  stringFilter: false,
  short: 6,
  long: 16,
  capitalize: true,
  lowercase: false,
  uppercase: false,
});

const loading = ref(false);
const showResults = ref(false);
const results = reactive({
  first: '',
  second: '',
  third: '',
  all: '',
});

// 工具函数
const getUpper = (l: string[]) => {
  const upperPattern = /.*[a-z].*/;
  return l.concat(l.map(i => upperPattern.test(i) ? i.toUpperCase() : '')).filter(Boolean);
};

const getLower = (l: string[]) => {
  const lowerPattern = /.*[A-Z].*/;
  return l.concat(l.map(i => lowerPattern.test(i) ? i.toLowerCase() : '')).filter(Boolean);
};

const getCapitalize = (l: string[]) => {
  const capitalizePattern = /^[a-z].*/;
  return l.concat(l.map(i => capitalizePattern.test(i) ? i.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : '')).filter(Boolean);
};

const getDistinctList = (l: string[]) => {
  return Array.from(new Set(l)).filter(Boolean);
};

const getRepeat = (l: string[], x = 3) => {
  const lr = l.map(i => (i.length > 0 && i.length <= x) ? i + i : '');
  return l.concat(lr).filter(Boolean);
};

const getHeadTail = (s: string, ...l: number[]) => {
  return [s].concat(l.map(i => s.length > i ? [s.substring(0, i), s.substring(s.length - i)] : []).reduce((a, b) => a.concat(b))).filter(Boolean);
};

const dropShortLong = (l: string[], start = 6, end = 16) => {
  return l.filter(i => ((start ? i.length >= start : true) && (end ? i.length <= end : true)));
};

const dropStringInt = (l: string[], rtype: 'str' | 'int') => {
  if (['str', 'int'].indexOf(rtype) < 0) {
    return l;
  }
  const pattern = rtype === 'str' ? /^[a-zA-Z]*$/ : /^[0-9]*$/;
  return l.filter(i => !pattern.test(i));
};

const calcDescartes = (array: string[][]) => {
  if (array.length < 2) return array[0] || [];
  return array.reduce((total, currentValue) => {
    let res: string[][] = [];
    total.forEach(t => {
      currentValue.forEach(cv => {
        res.push([t, cv]);
      });
    });
    return res;
  });
};

const permutations = (arr: string[], size: number): string[][] => {
  let result: string[][] = [];

  function _combine(selected: string[], arr: string[], size: number) {
    if (size === 0) {
      result.push(selected);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      let temp = selected.slice();
      temp.push(arr[i]);
      _combine(temp, arr.slice(0, i).concat(arr.slice(i + 1)), size - 1);
    }
  }
  _combine([], arr, size);
  return result;
};

// 主要功能函数
const generatePasswords = () => {
  loading.value = true;
  showResults.value = false;

  setTimeout(() => {
    try {
      const startTime = new Date().getTime();
      
      // 生成密码逻辑
      const firstNameCombine = /^[a-zA-Z0-9]+$/.test(formData.firstName) ? getRepeat([formData.firstName], 3) : [''];
      const lastNameCombine = /^[a-zA-Z0-9]+$/.test(formData.secondName + formData.thirdName) ? getRepeat([formData.secondName + formData.thirdName], 3) : [''];
      
      let nameAll = [firstNameCombine[0] + lastNameCombine[0], lastNameCombine[0] + firstNameCombine[0]];
      const lastNameAB = formData.secondName.substring(0, 1) + formData.thirdName.substring(0, 1);
      nameAll = nameAll.concat([
        formData.firstName.substring(0, 1) + lastNameAB,
        firstNameCombine[0] + lastNameAB,
        lastNameAB + formData.firstName.substring(0, 1),
        lastNameAB + firstNameCombine[0],
        formData.firstName.substring(0, 1) + formData.secondName + formData.thirdName,
        formData.secondName + formData.thirdName,
        formData.firstName
      ]);

      // 生日相关密码
      let birthdayAll = [];
      if (formData.birthday) {
        const b = formData.birthday.replaceAll('-', '');
        birthdayAll = birthdayAll.concat(getHeadTail(b, 4));
        if (b.substring(4, 5) === '0') {
          birthdayAll = birthdayAll.concat([b.substring(5, 8), b.substring(5, 8) + b.substring(5, 8)]);
        }
      }
      if (formData.birthday2) {
        const b2 = formData.birthday2.replaceAll('-', '');
        birthdayAll = birthdayAll.concat(getHeadTail(b2, 4));
        if (b2.substring(4, 5) === '0') {
          birthdayAll = birthdayAll.concat([b2.substring(5, 8), b2.substring(5, 8) + b2.substring(5, 8)]);
        }
      }
      birthdayAll = getDistinctList(birthdayAll);

      // 邮箱相关密码
      const emailAll = formData.email ? getDistinctList([formData.email].concat(getRepeat(getHeadTail(formData.email.split('@')[0], 3, 4), 3))) : [];

      // 电话相关密码
      let phoneAll = [];
      if (formData.mobile) {
        phoneAll = phoneAll.concat(getRepeat(getHeadTail(formData.mobile, 3, 4, 5, 6)));
      }
      if (formData.telephone) {
        phoneAll = phoneAll.concat(getRepeat(getHeadTail(formData.telephone, 3, 4, 5, 6)));
      }
      phoneAll = getDistinctList(phoneAll);

      // 身份证号相关密码
      let idCardAll = [];
      if (formData.idCard) {
        idCardAll = getDistinctList(getRepeat(getHeadTail(formData.idCard, 3, 4, 6, 8).concat(getHeadTail(formData.idCard.substring(0, formData.idCard.length - 1), 3, 4, 6, 8).slice(1))));
      }

      // 工号相关密码
      let workNoAll = formData.workNo ? getDistinctList(getRepeat(getHeadTail(formData.workNo, 3, 4, 6, 8))) : [];

      // 组织相关密码
      let orgAll = [];
      if (formData.organization) {
        orgAll = orgAll.concat(getRepeat(getHeadTail(formData.organization, 3, 4)));
      }
      if (formData.company) {
        orgAll = orgAll.concat(getRepeat(getHeadTail(formData.company, 3, 4)));
      }
      orgAll = getDistinctList(orgAll);

      // 短语相关密码
      let likeAll = formData.likeUse ? getDistinctList(formData.likeUse.split(',').map(i => getRepeat(getHeadTail(i, 3, 4))).reduce((a, b) => a.concat(b))) : [];

      // 常用词组
      let commonAll = formData.common.split(',');
      if (formData.haveYear) {
        Array.from(Array(formData.year), (el, i) => commonAll.push((new Date().getFullYear() - formData.year + i).toString()));
      }

      // 组合所有密码列表
      let passListAll = [nameAll, birthdayAll, emailAll, phoneAll, idCardAll, workNoAll, orgAll, likeAll, commonAll].filter(arr => arr.length > 0);
      let passFirst = passListAll.reduce((a, b) => a.concat(b));

      // 生成两项组合密码
      let passSecond = [];
      let passThird = [];
      if (passListAll.length >= 2) {
        permutations(passListAll, 2).forEach(passArr => {
          let passCombine = calcDescartes(passArr);
          passSecond = passSecond.concat(passCombine.map(p => p[0] + p[1]));
          passCombine.forEach(p => {
            formData.connector.split('').forEach(c => {
              if (formData.connectorLeft) {
                passThird.push(c + p[0] + p[1]);
              }
              if (formData.connectorMiddle) {
                passThird.push(p[0] + c + p[1]);
              }
              if (formData.connectorRight) {
                passThird.push(p[0] + p[1] + c);
              }
            });
          });
        });
      }

      // 应用过滤和转换
      let passList = [passFirst, passSecond, passThird];
      passList = passList.map(i => dropShortLong(i, formData.short, formData.long));
      if (formData.numberFilter) {
        passList = passList.map(i => dropStringInt(i, 'int'));
      }
      if (formData.stringFilter) {
        passList = passList.map(i => dropStringInt(i, 'str'));
      }
      if (formData.capitalize) {
        passList = passList.map(i => getCapitalize(i));
      }
      if (formData.lowercase) {
        passList = passList.map(i => getLower(i));
      }
      if (formData.uppercase) {
        passList = passList.map(i => getUpper(i));
      }
      passList = passList.map(i => getDistinctList(i));

      // 赋值结果
      results.first = passList[0].join('\n');
      results.second = passList[1].join('\n');
      results.third = passList[2].join('\n');
      results.all = [...passList[0], ...passList[1], ...passList[2]].join('\n');

      const endTime = new Date().getTime();
      console.log(`cost ${endTime - startTime}ms`);

      showResults.value = true;
    } catch (error) {
      Message.error('生成密码时发生错误');
      console.error(error);
    } finally {
      loading.value = false;
    }
  }, 0);
};

const resetForm = () => {
  Object.assign(formData, {
    firstName: '',
    secondName: '',
    thirdName: '',
    birthday: '',
    birthday2: '',
    email: '',
    mobile: '',
    telephone: '',
    username: '',
    account: '',
    organization: '',
    company: '',
    likeUse: '',
    idCard: '',
    workNo: '',
    connector: '',
    connectorLeft: false,
    connectorMiddle: false,
    connectorRight: false,
    common: '123,888,666,000,111,aaa,abc,qaz,qwe,asd,zxc,!@#,1234,1qaz,qwer,asdf,zxcv,!@#$,1357,2468,0123,6789,6666,8888,12345,123456',
    haveYear: false,
    year: 10,
    numberFilter: false,
    stringFilter: false,
    short: 6,
    long: 16,
    capitalize: true,
    lowercase: false,
    uppercase: false,
  });
  showResults.value = false;
};

const copyResults = (type: 'first' | 'second' | 'third' | 'all') => {
  const text = results[type];
  navigator.clipboard.writeText(text).then(() => {
    Message.success('已复制到剪贴板');
  }).catch(() => {
    Message.error('复制失败');
  });
};

const downloadPasswords = () => {
  const list = results.all.split('\n');
  const blob = new Blob([list.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'passwords.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<style scoped lang="less">
.main {
  padding: 20px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.alert-info {
  margin: 16px 0;
}

.form-container {
  margin: 20px 0;
  max-width: 800px;
}

.results-container {
  margin-top: 20px;
}

.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

:deep(.arco-form-item) {
  margin-bottom: 16px;
}

:deep(.arco-input-wrapper) {
  width: 200px;
}

:deep(.arco-space) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.arco-form-item-label) {
  width: 100px;
  text-align: right;
  padding-right: 12px;
  line-height: 32px;
}

:deep(.arco-form-item-content) {
  margin-left: 0;
}

:deep(.arco-form-item-wrapper) {
  display: flex;
  align-items: center;
}

:deep(.arco-switch) {
  margin: 0 8px;
}

label {
  color: #495060;
  font-size: 14px;
}
</style> 