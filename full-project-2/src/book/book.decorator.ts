import { SetMetadata } from "@nestjs/common";

export const BookMetaDataKey = "book";

export const Book = (metadata: { key: string; value: string }) => {
  return SetMetadata(BookMetaDataKey, metadata);
};
