import ttl2jsonld from "@frogcat/ttl2jsonld";
import jsonld from "jsonld";
import { context } from "./context.js";


export const buildJSON = async (ttlString, account) => {
  const doc = ttl2jsonld.parse(ttlString);
  const expanded = await jsonld.expand(doc);
  const compacted = await jsonld.compact(expanded, context);
  // TODO get all available languages and stor them as attribute for Concept Scheme
  var entries = [];
  var dataset = "";

  compacted["@graph"].forEach((graph, _) => {
    const { ...properties } = graph;
    const type = Array.isArray(properties.type)
      ? properties.type.find((t) => ["Concept", "ConceptScheme"])
      : properties.type;
    const node = {
      ...properties,
      type,
    };
    if (node.type === "ConceptScheme") {
      dataset = node.id;
      if (typeof node.preferredNamespaceUri === "string") {
        const id = node.preferredNamespaceUri;
        node.preferredNamespaceUri = { id };
      }
    } else if (node.type === "Concept") {
      dataset = node?.inScheme?.[0]?.id ?? node.topConceptOf[0].id;
    }

    if (node.topConceptOf) {
      node.inScheme = node.topConceptOf;
    }

    node["dataset"] = dataset;
    node["account"] = account;

    entries.push(node);
  });
  return { account: account, dataset: dataset, entries: entries };
}
