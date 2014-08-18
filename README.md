Manipulo.js
===========

Simple extension for JavaScript arrays

# Examples
Those are just few examples of manipulo

## Array.sortBy

### Single key

```javascript
Array.sortBy( key );
```

```javascript
var countries = [
	{country:"Poland",shortcut:"pl"},
	{country:"France",shortcut:"fr"},
	{country:"Czech republic",shortcut:"cs"},
	{country:"Spain",shortcut:"es"}
];

countries.sortBy("country");
```

```javascript
[
	{country:"Czech republic",shortcut:"cs"},
	{country:"France",shortcut:"fr"},
	{country:"Poland",shortcut:"pl"},
	{country:"Spain",shortcut:"es"}
]
```

### Multiple keys

```javascript
Array.sortBy( [key1, key2...] );
```

```javascript
var values = [
	true,
	1,
	"stringie",
	{key:2,value:57},
	{key:1,value:55},
	{key:2,value:56}
];

values.sortBy(["key","value"]);
```

```javascript
[
	1,
	"stringie",
	true,
	{key:1,value:55},
	{key:2,value:56},
	{key:2,value:57}
]
```

## Array.groupBy

```javascript
Array.groupBy( key );
```

```javascript
var values = [
	true,
	"something",
	{category:1,name:"jogurt"},
	{category:1,name:"milk"},
	{category:2,name:"cider"},
	{category:3,name:"game"}
];

values.groupBy("category");
```

```javascript
[
	[ true, "something" ],
	[ {category: 1, name: "jogurt"}, {category: 1, name: "milk"} ],
	[ {category: 2, name: "cider"} ],
	[ {category: 3, name: "game"} ]
]
```

