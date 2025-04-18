import type { Recipe, RecipeList } from "@/types"
import { reactive } from "vue"

const openDB = reactive<IDBOpenDBRequest>(indexedDB.open("myDB", 1))
let myDB: IDBDatabase

function initDB() {
   openDB.onerror = (event: Event) => {
      console.error("Ошибка при открытии базы данных", event)
   }

   openDB.onsuccess = (event: Event) => {
      myDB = (event.target as IDBOpenDBRequest).result
   }

   openDB.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      myDB = (event.target as IDBRequest<IDBDatabase>).result

      // Создание объектного хранилища
      if (!myDB.objectStoreNames.contains("favorites")) {
         myDB.createObjectStore("favorites", { keyPath: "id" })
      }

      // if (!myDB.objectStoreNames.contains("statistic")) {
      //    myDB.createObjectStore("statistic", { keyPath: "id", autoIncrement: true })
      // }
   }
}

function addRecord(nameCollection: string, addItem: object): void {
   const store = getObjectStore(nameCollection, "readwrite")
   const addItemRequest = store.put(addItem)

   addItemRequest.onsuccess = (event: Event) => {
      console.log("Запись успешно добавлена:", (event.target as IDBRequest<number>).result)
   }

   addItemRequest.onerror = (event: Event) => {
      console.error("Ошибка:", (event.target as IDBRequest).error)
   }
}

function deleteRecord(nameCollection: string, id: number): void {
   const store = getObjectStore(nameCollection, "readwrite")
   const addItemRequest = store.delete(id)

   addItemRequest.onsuccess = (event: Event) => {
      console.log("Запись успешно удалена:", (event.target as IDBRequest<number>).result)
   }

   addItemRequest.onerror = (event: Event) => {
      console.error("Ошибка:", (event.target as IDBRequest).error)
   }
}

async function getRecord(nameCollection: string, id: number) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const store = getObjectStore(nameCollection, "readonly")
         const getItemRequest = store.get(id)

         getItemRequest.onsuccess = (event: Event) => {
            const foundItem = (event.target as IDBRequest<Recipe>).result
            resolve(setObjectFormat(foundItem, reject))
         }

         getItemRequest.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
         }
      }, 300)
   })
}

async function getRecords(nameCollection: string) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const store = getObjectStore(nameCollection, "readonly")
         const getAllRequest = store.getAll()

         getAllRequest.onsuccess = (event: Event) => {
            const list = (event.target as IDBRequest<RecipeList>).result
            resolve(list.map((item) => setObjectFormat(item, reject)))
         }

         getAllRequest.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
         }
      }, 300)
   })
}

function getObjectStore(nameCollection: string, transactionMode: IDBTransactionMode): IDBObjectStore {
   const transaction = myDB.transaction([nameCollection], transactionMode)
   return transaction.objectStore(nameCollection)
}

function setObjectFormat(item: Recipe, reject: (reason?: unknown) => void) {
   if (item?.id) {
      const { analyzedInstructions, extendedIngredients, nutrition } = item

      return {
         ...item,
         analyzedInstructions: JSON.parse(analyzedInstructions as string),
         extendedIngredients: JSON.parse(extendedIngredients as string),
         nutrition: JSON.parse(nutrition as string),
      }
   } else {
      reject(new Error("Нет такого элемента в IndexedDB"))
   }
}

initDB()

export default { addRecord, deleteRecord, getRecord, getRecords }
