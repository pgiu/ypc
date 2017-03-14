echo $1
cat $1 | grep -Eoi '<a [^>]+>' |  grep -Eo 'href="[^\"]+"' |  grep -Eo '(http|https)://www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]*'
