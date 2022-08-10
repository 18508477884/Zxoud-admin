import Mock from 'mockjs';

// 模拟数据，具体使用查看文档
// 这里的/api是项目里的baseurl，你项目中的baseUrl是什么这里就改成什么
Mock.mock('/api/user/login', {
  status: 0,
  'data|10': [
    {
      'id|10000-11000': 0,
      username: '@cname',
      email: '@email',
      phone: /^1[385][1-9]\d{8}/,
      role: 0,
      createTime: 1479048325000,
      updateTime: 1479048365000,
    },
  ],
});
Mock.mock('/api/file/Info', {
  status: 0,
  'data|8-14': [
    {
      'id|+1': 1,
      'name|1': ['@ctitle(4, 9)', '@word(3, 5)'],
      time: function () {
        return new Date().getTime();
      },
      'type|1': ['文件夹', '文件夹', '文件夹', '视频', '文本'],
      size: '@integer(1, 800)',
      'children|3-6': [
        {
          'id|+1': 1,
          'name|1': ['@ctitle(4, 9)', '@word(3, 5)'],
          time: function () {
            return new Date().getTime();
          },
          'type|1': ['文件夹', '文件夹', '视频', '文本'],
          size: '@integer(1, 800)',
          'children|1-5': [
            {
              'id|+1': 1,
              'name|1': ['@ctitle(4, 9)', '@word(3, 5)'],
              time: function () {
                return new Date().getTime();
              },
              'type|1': ['视频', '文本', '文件夹', '文件夹'],
              size: '@integer(1, 800)',
              'children|1-5': [
                {
                  'id|+1': 1,
                  'name|1': ['@ctitle(4, 9)', '@word(3, 5)'],
                  time: function () {
                    return new Date().getTime();
                  },
                  'type|1': ['视频', '文本'],
                  size: '@integer(1, 800)',
                  'children|1-5': [
                    {
                      'id|+1': 1,
                      'name|1': ['@ctitle(4, 9)', '@word(3, 5)'],
                      time: function () {
                        return new Date().getTime();
                      },
                      'type|1': ['视频', '文本'],
                      size: '@integer(1, 800)',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
