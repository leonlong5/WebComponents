//1. coorect output
var Foo = function (a) {
  function bar () {
    console.log(a)
  }

  this.baz = function () {
    console.log(a);
  }
}

Foo.prototype = {
  biz: function () {
    console.log(a);
  }
}

var f = new Foo(7);
f.bar(); //error, undefined, because when new keyward applies to a function, it will create a new instance, then assign this to cur instance
f.baz();//7
f.biz();//undefined

//modified workable solution
var Foo = function (a) {
  this.a = a;
  this.bar = function() {
    console.log(a)
  }

  this.baz = function () {
    console.log(a);
  }
}

Foo.prototype = {
  biz: function () {
    console.log(this.a);
  }
}


//2. sort by count
endorsements = [

{skill: 'js', user: 'john'},

{skill: 'java', user: 'tom'},

{skill: 'js', user: 'jack'},

{skill: 'c', user: 'steven'},

]

//output
//
// [
//
// {skill: 'js', user: ['john', 'jack'], count: 2},
//
// {skill: 'java', user: ['tom'], count: 1},
//
// {skill: 'c', user: ['steven'], count: 1},
//
// ]

//first create a counter object act as hashmap, to store the skill:[users:[], count]
counter = {};
for (var i = 0; i < endorsements.length; i++) {
  let skill = endorsements[i].skill;
  let user = endorsements[i].user;
  if (skill in counter) {
    counter[skill].count++;
    counter[skill].users.push(user);
  } else {
    counter[skill] = {count:1, users:[user]}
  }
}
console.log(counter)

//next get the objects into an array
res = [];
for (var key in counter) {
  let count = counter[key].count;
  let users = counter[key].users;
  res.push({'skill': key, 'users': users, 'count': count})
}
//last sort the object by property count
res.sort(function(a, b) {
  return b.count - a.count;
})
console.log(res)
