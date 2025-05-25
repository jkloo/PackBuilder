import { DatasetSlice } from "./dataset";
import { PackBuilderSlice } from "./packBuilder";
import { PackDatabaseSlice } from "./packDatabase";

export type Store = DatasetSlice & PackBuilderSlice & PackDatabaseSlice
