import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  const editorDb = await openDB('jate',1);
  const tx = editorDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({id: 1,value: content})
  const results = await request;
  console.log('your item has been saved to the database' , results.value)

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const editorDb = await openDB('jate',1);
  const tx = editorDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1)
  const results = await request;
  if(results){
    console.log('data recived' , results.value)

  } else {
    console.log('data not found')
  }
  return results?.value
}

initdb();
