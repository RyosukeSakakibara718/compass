# 評価観点に関して

## アーキテクチャの選定理由

- Next.jsを採用
  - App Routerによってディレクトリベースのルーティングになっており、直感的な理解がしやすく開発体験が向上
  - 今後、バックエンドの開発が行われる場合にプロジェクトを分けずに開発が行うことができ、その場合プロジェクト内で型が一元管理できる
  - vercelとの相性がよく、CI/CD・デプロイがほとんど自動化できる
- src/featureディレクトリに機能単位でコードを分け、関連するコンポーネント、API、フック等を1つの場所にまとめることによって、機能単位の管理がしやすくなっている

## どのように責務を意識した実装したか

- UI表示
  - src/app/facilitators/page.tsx
    - 単にUIの描画のみを担当
- データ取得と状態管理
  - src/feature/facilitators/hooks/useFacilitators.ts
    - カスタムフックがデータ取得・ページネーション・ソート・フィルタリングの状態を管理
- API通信
  - src/feature/facilitators/api/facilitators.ts
    - API通信のロジック
- UIコンポーネント
  - src/feature/facilitators/Facilitators
    - 一つの機能に関する画面を構成する最大単位のコンポーネント
  - src/feature/facilitators/components/TeacherList
    - この画面でしか使用しないUIパーツ
  - src/components
    - 今後全体で使用する可能性のあるUIパーツ
- typeファイル
  - feature単位でtypesファイルを作成し、今後他のファイルで使用する可能性が高いものは切り出して記述する

## どのように適宜カスタムフックの利用やコンポーネントの分割を行なったか

- カスタムフック
  - useFacilitatorsがやや煩雑なロジックをカプセル化し、コンポーネントからデータ取得・状態管理の詳細を隠蔽
- コンポーネント
  - 下記の通り、一つのファイルが膨らみすぎないよう・再利用ができるように分割
    - src/feature/facilitators/components/TeacherList
    - src/components

## どのように再描画抑制などのパフォーマンスを考慮したか

- useCallback
  - 関数の再生成を防ぐためにuseCallbacを使用することで、これにより無駄なレンダリングを防止
