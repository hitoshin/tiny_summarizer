TinySummarizer
====

## 概要
TinySummarizer は自動要約プログラムです。2015年9月8日時点では単一文書要約のみに対応しています。

## 特徴
* TinySummarizer は自動要約プログラム [Shuca](https://github.com/hitoshin/shuca) を JavaScript に移植したものです。
* HTML 文書などから本文抽出されたテキストを対象に要約を行うことを想定しています。そのため、 Shuca とは異なり、様々な文書ドメインにおいて比較的頑健であると思われる単語頻度のみを用いて重要文の抽出を行っています。
* [TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/) による前処理を想定しているため、品詞による内容語と機能語の選別を行っておらず、内部に保持したストップ・ワードのリストに基づいて重要文の抽出に利用する単語の選別を行います。

## 必要なツール
TinySummarizer は TinySegmenter による解析結果を想定してはいますが、単語分割済みの文さえ用意されるのであれば前処理は問いません。

* [TinySegmenter version 0.2](http://chasen.org/~taku/software/TinySegmenter/)

## インストール
特にインストールのための作業は必要ありません。内容物を適当なディレクトリに置いてください。

## 使い方
`test.html` 内のサンプル・コードを参考にしてください。要約器インスタンスの `summarize` メソッドの引数はそれぞれ単語列（の列）と要約長です。

## その他
* 現在、 TinySummarizer 内に保持されているストップ・ワードは非常に少数です。ストップ・ワードのリストは今後増強されます。

## 開発者
[hitoshin](https://github.com/hitoshin)
