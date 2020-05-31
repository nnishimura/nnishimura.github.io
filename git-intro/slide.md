# Gitでやらかした時に使える奥義

---

## あるある

---

![naoko__Git_.png](https://qiita-image-store.s3.amazonaws.com/0/77729/0252ac24-713b-02ba-34a9-bbf97648230a.png "naoko__Git_.png")

--

* ファイルを間違って更新してしまった
* Commitメッセージが間違っている
* 同じようなCommitがたくさん並んでいる

--

* Commitをなかったことにしたい
* Commitメッセージを変えたい
* Commitをまとめたい

--

## やらかした時に使える奥義

--

### プッシュする前
* 直前のCommitだけを修正する場合： **amend**
* Commitを消したい場合： **reset**
* 古いCommitを修正する場合： **rebase**

---

### プッシュした後
* Commitをなかったことにしたい：**revert**	
<br /><br />
**Push後にはamend/reset/rebaseしちゃダメ！**

---

## （amend）コミットメッセージを書き直したい時

---

直前のコミットは、コミットした後に再度コミットボタンを押し、下記のように「最新のコミットを修正」を選択する。	
![スクリーンショット_2017-02-28_21_14_43_1.png](https://qiita-image-store.s3.amazonaws.com/0/77729/db95e6f6-4fdc-f12d-a667-e6d5e6736aa5.png "スクリーンショット_2017-02-28_21_14_43_1.png")

--

## （rebase）古いコミットを書き直したい場合

--

**注：プッシュ後のコミットはrebaseしちゃダメ！！**
直したいコミットの親コミットの上で、「xxxの子を対話形式でリベース」を選択	
![スクリーンショット 2017-02-28 21.47.07 1.png](https://qiita-image-store.s3.amazonaws.com/0/77729/e94532b3-7c57-d146-80f8-dc3ecab5df5c.png "スクリーンショット 2017-02-28 21.47.07 1.png")
「メッセージを編集」でコミットメッセージを編集、	
またはドラッグ＆ドロップでコミットの順番を入れ替える	
![Kobito.uu6Kf5.png](https://qiita-image-store.s3.amazonaws.com/0/77729/3ed5e404-7683-0486-f0cb-e0195146bd70.png "Kobito.uu6Kf5.png")


---

## （rebase）直前のCommitから任意のCommitまでまとめたい

---

まとめたいコミットの上で「このコミットまでmasterを元に戻す」を選択。	
Using modeでSoftを選択してOK	
その後、新しくCommitすることでCommitをまとめることができます。	
![スクリーンショット 2017-02-28 21.26.34.png](https://qiita-image-store.s3.amazonaws.com/0/77729/a2cc3ddf-1fda-c555-a796-66350e2cc484.png "スクリーンショット 2017-02-28 21.26.34.png")

---

## （rebase）rebaseを中止する

---

すんませんこれだけSourcetreeの操作方法が見つかりませんでした。。。rebaseして何もしないまま終了したい場合などは、下記のcommandでがんばる。

```
$ git rebase --abort
```

---

## （revert）プッシュ後だけどコミットをなかったことにしたい

---

「コミット適用前に戻す」を選択します。
OKを押すと、「Revert コミット名」という名前の新しいコミットができます。		
![スクリーンショット_2017-02-28_22_15_35.png](https://qiita-image-store.s3.amazonaws.com/0/77729/95843e8e-dffa-8bd8-79b1-b283956636b8.png "スクリーンショット_2017-02-28_22_15_35.png")

---

## （reset）コミット内容をなかったことにしたい

--- 

戻したいコミットの上で「このコミットまでブランチ名を元に戻す」を選択。	
modeはSoftを選択してOK	
![スクリーンショット 2017-02-28 21.58.09.png](https://qiita-image-store.s3.amazonaws.com/0/77729/3ce64726-7ca7-fcef-b587-7c95d0da907d.png "スクリーンショット 2017-02-28 21.58.09.png")

---

## やっちゃダメなこと

---

* push後にammend/reset/rebaseする

---

![Kobito.qIU2Vs.png](https://qiita-image-store.s3.amazonaws.com/0/77729/d1166d2f-50da-489b-1794-1aee42fde23a.png "Kobito.qIU2Vs.png")

---

  ## でも

---

### さらにもっとやらかした場合は？

---

ターミナルでがんばる！	
[ Gitでやらかした時に使える19個の奥義 ]   
http://qiita.com/muran001/items/dea2bbbaea1260098051

---

## できるだけ、やらかさないようにしたいですね

---

## おわり
