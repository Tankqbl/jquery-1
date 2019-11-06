/*const api = jQuery('.test')
api.addClass('red').
    addClass('blue') 这是中间过程,
    这里return的this是api这个被定义的东西，
    实际上是jQuery('.test')，
    但是可以省略声明过程直接
    进行调用*/

/*jQuery('.test').
    addClass('red').
    addClass('blue')*/
/*
let a = jQuery('.test').find('.1')
console.log(a)
//注意不要用数字命名class
但是这里也有不合理的地方，如果这样的话无法链式操作
*/
jQuery('.test').
    find('.child').
    addClass('red').
    end().
    addClass('yellow')
let x = jQuery('.test').find('.aaa')

x.each((div) => console.log(div))
x.parent().print()