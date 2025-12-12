import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | kopo-k\'s DevLog',
  description: 'kopo-k\'s DevLogについて - プログラミング学習ブログ',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              kopo-k&apos;s DevLogについて
            </h2>
            <p className="text-gray-600 leading-relaxed">
              kopo-k&apos;s DevLogは、プログラミング学習の過程を記録し、知識を体系的に整理するための個人ブログです。
              初学者から中級者の方々に向けて、実践的な技術記事や学習ログを発信しています。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              このブログの目的
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>学習内容のアウトプットを通じて、理解を深める</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>同じ道を歩む学習者の参考になる情報を提供する</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>技術的な課題解決の記録を残し、知識を共有する</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>継続的な学習習慣を身につける</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              主なトピック
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <p className="text-sm text-gray-600">
                  React, Next.js, TypeScript, CSS
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <p className="text-sm text-gray-600">
                  Node.js, API設計, データベース
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">開発ツール</h3>
                <p className="text-sm text-gray-600">
                  Git, VSCode, Docker, CI/CD
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">学習方法</h3>
                <p className="text-sm text-gray-600">
                  効率的な学習法、リソース紹介
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              技術スタック
            </h2>
            <p className="text-gray-600 mb-4">
              このブログは以下の技術を使用して構築されています：
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Framework:</strong> Next.js 14 (App Router)
                </li>
                <li>
                  <strong>Language:</strong> TypeScript
                </li>
                <li>
                  <strong>Styling:</strong> Tailwind CSS
                </li>
                <li>
                  <strong>Content:</strong> MDX
                </li>
                <li>
                  <strong>Hosting:</strong> Vercel
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              お問い合わせ
            </h2>
            <p className="text-gray-600">
              ご質問やフィードバックがありましたら、GitHubのIssueやTwitterでお気軽にご連絡ください。
              記事の内容に関する質問も歓迎です。
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/kopo-k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                GitHub
              </a>
              <a
                href="https://x.com/dshdh364192"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                X (Twitter)
              </a>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}