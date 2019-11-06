window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    }
    else if (selectorOrArray instanceof Array) {
        /*、instanceof的作用是用来做检测类型：
        具体的内容看这个文章
        https://juejin.im/post/5b7f64be51882542c83476f0
*/
        elements = selectorOrArray
    }

    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
            //链式操作，这样可继续在此基础上操作
            //本来是return api,但是obj.fn(p1),这里this就是obj
            //所以api.addClass()这里的this就是api
        },


        find(selector) {
            let array = []
            for (i = 0; i < elements.length; i++) {
                const x = Array.from(
                    elements[i].querySelectorAll(selector))
                //注意要用Array.from把后面的伪数组变成数组，
                //否则会有bug
                array = array.concat(x)
            }

            array.oldApi = this/*新弄一个属性，为oldApi，
            这里的this仅仅是指代之前的this，
            也就是省略掉的api这个东西，这里的this
            还没有经历newApi这个过程，所以还是指代原来的Api
            但oldApi这个东西仅仅在数组上是不行的，所以要
            复制一份变成对象的oldApi*/

            return jQuery(array)  /*return array*/
            /*如果这样写的话，无法链式操作，而且此处
            无法return this，因为这里的this是find前面的那个，
            也就是jQuery('.test'),同时由于其是个数组。
            所以要想办法重新封装一下，可以让this指find后面的东西
            newApi = jQuery(array)，而新的Api就是jQuery(array)*/
        },

        each(fn) {
            for (i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        print() {
            console.log(elements)
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
                //如果不存在，就push，反之不push，
                //这样可避免重复push父亲
            })
            return jQuery(array)
        },
        children() {
            const array = []
            this.each((node) => {

                array.push(...node.childrenNode)

                //...node.childrenNode可以把得到的儿子数组展开，
                //而不是成为一个有结构的数组,而且这里如果有重复的儿子也要展示出来

            })
            return jQuery(array)
        },
        oldApi: selectorOrArray.oldApi,
        /*但oldApi这个东西仅仅在数组上是不行的，所以要
            复制一份变成selectorOrArray的oldApi属性*/
        end() {
            return this.oldApi//这里的this是新的api
            //this要结合上下文语境来看，不同地方的this实际是不同的
        }
    }
    //jQuery返回的不element，而是可以操作element的东西
}