import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./userResolvers.js";
import productResolvers from "./productResolvers.js";

export const resolvers = mergeResolvers([userResolvers, productResolvers]);
