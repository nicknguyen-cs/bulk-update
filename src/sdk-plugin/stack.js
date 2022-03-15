const contentstack = require("contentstack");
const contentstackManagement = require('@contentstack/management');

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_API_KEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us",
});

const client = contentstackManagement.client()
    client.login({ email: 'nick.nguyen@contentstack.com', password: 'tOby603803.' })
.then(() => console.log('Logged in successfully'))

if (process.env.CUSTOM_HOST) {
  Stack.setHost(process.env.CUSTOM_HOST);
}

// management: cs8bb5339d9e5442f71a9ba656
export default {
  async updateAllEntries(contentType, field, input) {
        return new Promise((resolve, reject) => {
      let data = Stack.ContentType(contentType).Query().toJSON().find()
      data
        .then(function (result) {
          console.log(Stack, contentType, result);
          for (let i = 0; i < result[0].length; i++) {
            client.stack({ api_key: 'blt8f285fdea6372037' }).contentType(contentType).entry(result[0][i].uid).fetch()
              .then((entry) => {
                entry[field.data.uid] = input;
                entry["featured_image"] = "bltc7ef61b85cbb53db";
                console.log("success");
                return entry.update()
              })
              
          }
          resolve("success");
        }, function (error) {
          reject("error")
        })
    })


    /*
    client.stack({ api_key: process.env.REACT_APP_API_KEY }).contentType(data.contentTypeUid).entry(data.uid).fetch()
      .then((entry) => {
        entry.title = 'My New Entry'
        entry.description = 'Entry description'
        return entry.update()
      })
      .then((entry) => console.log(entry))
      */
  },
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   *
   */
  getEntry(contentTypeUid, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
    });
  },

  getContentTypes() {
    return new Promise((resolve, reject) => {
      const query = Stack.getContentTypes();
      query
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @returns
   */
  getEntryByUrl(contentTypeUid, entryUrl, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where("url", `${entryUrl}`).find();
      data.then(
        (result) => {
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        },
      );
    });
  },
};