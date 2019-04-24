/* 李雷和韩梅梅坐前后排，上课想说话怕被老师发现，所以改为传小纸条。为了不被老师发现他们纸条上说的是啥，他们约定了如下方法传递信息：
将26个英文字母（全为大写），外加空格，一共27个字符分成3组，每组9个。也就是ABCDEFGHI是第一组，JKLMNOPQR是第二组，STUVWXYZ*是第三组（此处用*代表空格）。
然后根据传递纸条那天的日期，改变字母的位置。
先根据月份数m，以整个分组为单位进行循环左移，移动(m-1)次。
然后根据日期数d，对每个分组内的字符进行循环左移，移动(d-1)次。
以3月8日为例，首先移动分组，3月需要循环左移2次，变成：
STUVWXYZ*，ABCDEFGHI，JKLMNOPQR
然后每组内的字符，8日的话需要循环左移7次，最终的编码为：
Z*STUVWXY，HIABCDEFG，QRJKLMNOP
对于要传递信息中的每个字符，用组号和组内序号两个数字来表示。
如果在3月8日传递信息“HAPPY”，那么H位于第2组的第1个，A位于第2组第3个，P位于第3组第9个，Y位于第1组第9个，所以纸条上会写成：
21 23 39 39 19
现在给定日期和需要传递的信息，请输出应该写在纸条上的编码。

输入规范：
每个输入包含两行。第一行是用空格分隔的两个数字，第一个数字是月份，第二个数字是日子。输入保证是一个合法的日期。
第二行为需要编码的信息字符串，仅由A~Z和空格组成，长度不超过1024个字符。

输出规范：
对每个输入，打印对应的编码，数字之间用空格分隔，每个输出占一行。

输入示例1:
1 1
HI
输出示例1:
18 19

输入示例2:
3 8
HAPPY
输出示例2:
21 23 39 39 19

输入示例3:
2 14
I LOVE YOU
输出示例3:
35 25 18 12 29 31 25 23 12 28
 */

function decodeText() {
  var letters = ['ABCDEFGHI', 'JKLMNOPQR', 'STUVWXYZ*'];
  var date = '2 14';
  var text = 'I LOVE YOU';
  var m = +date.split(' ')[0];
  var d = +date.split(' ')[1];

  function leftShift(arr, length, k){
    while (k--) {
      var tmp = arr[0];
      for(let i = 0; i < length; i++){
        arr[i] = arr[i+1];
      }
      arr[length-1] = tmp;
    }
  }
  leftShift(letters, letters.length, m-1)

  let map = [];
  for (let i = 0; i < 3; i++) {
    map[i] = letters[i].split('');
    leftShift(map[i], 9, d-1)
    map[i] = map[i].join('');
  }

  let code = [];
  let textArr = text.split('');
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i] === ' ') {
      textArr[i] = '*'
    }
    for (let j = 0; j < map.length; j++) {
      if (map[j].indexOf(textArr[i]) !== -1) {
        code.push(j+1 + '' + (map[j].indexOf(textArr[i])+1))
      }
    }
  }
  return code.join(' ');
}
console.log(decodeText());
