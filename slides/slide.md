# RDSでmysqldumpをうまく取ってリストアする方法

---

## あるある

---

![mysqldump001.png](https://qiita-image-store.s3.amazonaws.com/0/17518/ea747a74-f7ac-64af-1fb8-581185257b13.png "mysqldump001.png")

--

* 集計しやすい
  * 別DBのデータもjoinできる
* 運用しやすい
  * 本番DBに重いSQL投げたくない運用者
  * 　　　〃　　　　投げててほしくない管理者
  * 超最新データは無くてもいい

</br>

小〜中規模なら常套手段…ですよね？

---

## よくあるmysqldump

---

![mysldump002.png](https://qiita-image-store.s3.amazonaws.com/0/17518/b679a7c5-b75a-eea0-53f9-8c1e931e2046.png "mysldump002.png")

--

* サービスで使っているslaveからmysqldump
  * MyISAM mysqldump取得中のlock
  * サービスに影響を与えない取得方法はお金がかかる
    * LVMでsnap shotとってとかさ…
    * dump用のslave用意してとかさ…

---

## 一方、RDSは…

---
  
最初のうちはMASTER DB１つで運用して
</br>
インスタンスサイズ大きくしていって
</br>
参照がボトルネックになってきたら
</br>
Read Replicaを用意するのがいい…らしい

---

## slaveが無い
## 構成が多いのか…

---

## どうしよう

---

## …その前に。

---

## RDS基礎知識
## Backup Window

---

* Backup Window
  * 毎日のバックアップの希望時間(UTC)を設定できる
  * 指定時間の30分間の間にバックアップスナップショットが取得される

![mysqldump003.png](https://qiita-image-store.s3.amazonaws.com/0/17518/c6c5321c-b9e8-ee12-a590-0cfc76312738.png "mysqldump003.png")

---

## そうか！

--- 

## スナップショットから
## 一時的にRDS作れば
## mysqldump取得できる！

---

## 流れ

---

![mysqldump004.png](https://qiita-image-store.s3.amazonaws.com/0/17518/4b2118d8-6b3c-8971-7683-2ac30b504f91.png "mysqldump004.png")

---

## スナップショットから
## RDSを作る
## bashスクリプト

図の(2),(3)


---

  * https://github.com/imura81gt/aws-tools/blob/master/rds/restore-db-instance-from-db-snapshot.sh

---

## RDSを削除する
## bashスクリプト

図の(5)

---

  * https://github.com/imura81gt/aws-tools/blob/master/rds/delete-db-instance.sh
---

## 気をつけたこと

---

* RDSにEnvタグを付ける
  * スナップショットから作るRDSは「Env:backup」
  * IAM Policy
    * Env:backup のRDSしか削除できないPolicy

--

参照権限
<pre>
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "rds:Describe*",
                "rds:ListTagsForResource",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeVpcs",
                "ec2:DescribeAccountAttributes",
                "ec2:DescribeSecurityGroups"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
</pre>

--
スナップショット権限
<pre>
        {
            "Action": [
                "rds:RestoreDBInstanceFromDBSnapshot",
                "rds:CreateDBInstance"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
</pre>

--
更新、削除権限
- Env:backupのRDSだけ

<pre>
        {
            "Effect": "Allow",
            "Action": [
                "rds:DeleteDBInstance",
                "rds:ModifyDBInstance",
                "rds:ModifyDBParameterGroup",
                "rds:ModifyDBSubnetGroup",
                "rds:CopyDBSnapshot",
                "rds:DownloadDBLogFilePortion",
                "rds:PromoteReadReplica",
                "rds:RebootDBInstance",
                "rds:RestoreDBInstanceFromDBSnapshot",
                "rds:RestoreDBInstanceToPointInTime"
            ],
            "Resource": "*",
            "Condition": {
                "streq": {
                    "rds:db-tag/Env": [
                        "backup"
                    ]
                }
            }
        }
    ]
}
</pre>

---

## 良かったところ／悪かったところ

---

* 良かったところ
  * 本番環境RDSとは切り離された環境になるので…
    * Master - Slave関係がないので、無理にMasterとインスタンスサイズを合わせる必要が無い
      * Master : db.m3.large ／ backupRDS : db.t1.micro でもいい
    * read replicaと違って、作成時に本番環境に負荷をかけないで済む

--- 

* 悪かったところ
  * 小額だがお金はやっぱりかかる
  * スナップショットから作成するRDSのbackup windowをoffにしたいけど、status:available のあとに modifyしないとoffにできない
    * status:creatingの後、status:backing-upがすぐ実行されてしまう
  * IAMのテストをしっかりしないと、意図しないRDSを削除しかねない
  * バックアップ元RDSでinnodb_file_per_tableを有効にしちゃうと、スナップショットからの作成が遅い
  
---

## おわり
