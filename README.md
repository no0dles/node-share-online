# node-share-online

Share-online.biz Download API for Node.js

## Installation
```
npm install share-online --save
```

## Configuration
Create a api token on digitalocean and save it under `config/Default.json`
```json
{
  "Username": "012345678",
  "Password": "ah.k2kSAd0K"
}
```

## Usage

### Check links for status
```js
api.checkLinks(['SBABJKLNYE3T', 'www.share-online.biz/dl/CBGAJOL7XE3T'])
  .then(function(links) {
    ...
  });
```

### Get details of your account
```js
api.getUserDetail()
  .then(function(account) {
    ...
  });
```

### Get download details by id
```js
api.getDownloadLink(download_id)
  .then(function(details) {
    ...
  });
```

### Download file with progress callback
```js
var progress_callback = function(current, total) {
  console.log('%d of %d', current, total);
};

api.downloadFile(download_link, file_name, a, progress_callback)
  .then(function(response) {
    ...
  });
```