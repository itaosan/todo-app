# Todo App

画像アップロード機能付きのモダンなTodoアプリケーション。

## 🌟 機能

- タスクの追加、編集、削除
- タスクの完了/未完了の切り替え
- 画像のアップロードとプレビュー
- ダークモード対応
- レスポンシブデザイン

## 🛠️ 技術スタック

- [React](https://react.dev/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Vite](https://vitejs.dev/) - 高速な開発環境
- [Zustand](https://zustand-demo.pmnd.rs/) - 状態管理
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネント
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [Biome](https://biomejs.dev/) - リンター/フォーマッター

## 🚀 デモ

[https://todo-app-6lb.pages.dev/](https://todo-app-6lb.pages.dev/)

## 📦 インストール

```bash
# リポジトリのクローン
git clone https://github.com/itaosan/todo-app.git
cd todo-app

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## 🔧 環境構築

### 必要条件

- Node.js 18.0.0以上
- pnpm 9.0.0以上

### 開発環境のセットアップ

1. 依存関係のインストール:
```bash
pnpm install
```

2. 開発サーバーの起動:
```bash
pnpm dev
```

3. ビルド:
```bash
pnpm build
```

4. プレビュー:
```bash
pnpm preview
```

## 🧪 テスト

```bash
# テストの実行
pnpm test
```

## 📝 コミットメッセージの規則

- ✨ feat: 新機能
- 🐛 fix: バグ修正
- 📚 docs: ドキュメントのみの変更
- 💎 style: コードの動作に影響しない変更（空白、フォーマット、セミコロンの追加など）
- ♻️ refactor: バグ修正や機能追加のないコードの変更
- 🚀 perf: パフォーマンスを向上させるコードの変更
- 🧪 test: テストの追加・修正
- 🔧 chore: ビルドプロセスやツールの変更

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ feat: 素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
