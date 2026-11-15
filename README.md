# 双灯 · LIGHT 伴侣互动小测

自建「伴侣互动小测 / 讨论开场」轻量网页。约 40 题自评，客户端按 S1–S6 启发式规则打分，完成后免费展示个人风格名与三张讨论卡。答案仅存本机 `localStorage`。

**非诊断、不预测关系成败；禁止用单方数据伪造情侣对照。**

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://127.0.0.1:5173`）。

## 构建

```bash
npm run build
npm run preview   # 预览 dist/
```

## 产品要点

| 项 | 说明 |
|----|------|
| 品牌 | 双灯 |
| 题量 | LIGHT ≈40（含 DEMO / ATTN） |
| 评分 | 轴 A 顺畅↔张力 → S1–S6（个人路径不出 S3） |
| 报告 | 主风格 + 3 张讨论卡；情侣邀请为 localStorage stub |
| 门控 | 18+ 同意；中文 UI |

题库与计分规则来源：Project「问卷」`docs/light-item-bank.*`、`docs/style-scoring-rules-light.md`。
