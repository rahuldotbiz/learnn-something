import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { Attachment, FieldSet } from "airtable";
import Airtable from "airtable";
import { env } from "../../../env/server.mjs";

import TABLES from "../../../data/tables.json";
import { memoize } from "../../../utils/helpers";

const airApi = new Airtable({
  apiKey: env.AIRTABLE_KEY,
  endpointUrl: "https://api.airtable.com",
});

const TWO_HOURS = 1000 * 60 * 60 * 2;

export type Fields = {
  Description: string;
  Name: string;
  Link: string;
  Image: Attachment[];
  CaptionImage: string;
};

export const airTableRouter = createTRPCRouter({
  getTablesHome: publicProcedure.query(() => {
    const fieldSet = airApi
      .base("appfwEZTadMRrEPnh")("Resources")
      .select({
        view: "Grid view",
        maxRecords: 10,
      })
      .firstPage();

    const filtered: Promise<Fields[] | never[]> = Promise.resolve(
      fieldSet
        .then((records) => {
          return records.map((record) => {
            return {
              Description: record.fields.Description,
              Name: record.fields.Name,
              Link: record.fields.Link,
              Image: record.fields.Image,
              CaptionImage: record.fields["c-image"],
            } as Fields;
          });
        })
        .then((records) => {
          return records;
        })
        .catch((err) => {
          console.log(err);
          return [];
        })
    ).then((value) => {
      return value;
    });

    return filtered;
  }),
  getOtherTable: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      const r = TABLES[input.name as keyof typeof TABLES];
      const schema = z.object({ baseId: z.string(), tableName: z.string() });
      const { baseId, tableName } = schema.parse(r);

      const getAllFields = memoize(async (baseId, tableName) => {
        const fieldSet = airApi
          .base(baseId as string)(tableName as string)
          .select({
            view: "Grid view",
          })
          .all();
        return fieldSet;
      }, TWO_HOURS);

      const fieldSet = getAllFields(baseId, tableName)
        .then((records) => {
          return records;
        })
        .then((records) => {
          return records;
        })
        .catch((err) => {
          console.log(err);
          return [];
        }) as Promise<FieldSet | never[]>;

      return fieldSet;
    }),
});
