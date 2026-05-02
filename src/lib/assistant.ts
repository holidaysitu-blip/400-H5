const answers = [
  {
    hit: ['报名', '申请', '入住'],
    text: '可以在「礼包」页选择 2天299 或 7天599，提交姓名、手机号和你的创业方向。提交成功后会弹出客服微信二维码，请添加后确认名额。',
  },
  {
    hit: ['ai', 'AI', '算力', '工具'],
    text: '400盒子当前报名只保留2天299和7天599两个套餐。7天套餐里的4、5、6为三选一权益，可报名后加客服微信确认。',
  },
  {
    hit: ['地址', '苏州', '虎丘'],
    text: '当前页面展示的是苏州虎丘湿地公园方向的盒子社区。你可以在「社区」页查看介绍，并通过官网或客服微信确认最新开放批次。',
  },
  {
    hit: ['活动', '社群', '咖啡'],
    text: '咖啡社交夜已取消；当前只开放「礼包」页的2天299和7天599两个报名套餐。',
  },
];

export async function askBoxAssistant(prompt: string) {
  await new Promise((resolve) => window.setTimeout(resolve, 450));
  const found = answers.find((answer) => answer.hit.some((word) => prompt.includes(word)));
  return found?.text ?? '我会先帮你判断适合哪种加入方式：短住体验适合2天299，集中推进适合7天599；报名成功后请添加客服微信确认名额。';
}
