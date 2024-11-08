import { Account, Client, Databases } from "appwrite";

const hostname = import.meta.env.HOSTNAME;
const endpoint = import.meta.env.APPWRITE_ENDPOINT;
const projectID = import.meta.env.APPWRITE_PROJECT_ID;
const dbID = import.meta.env.APPWRITE_DB_ID;
const dbCitiesID = import.meta.env.APPWRITE_DB_CITIES_ID;
const dbReviewsID = import.meta.env.APPWRITE_DB_REVIEWS_ID;

const client = new Client().setEndpoint(endpoint).setProject(projectID);
const databases = new Databases(client);
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));