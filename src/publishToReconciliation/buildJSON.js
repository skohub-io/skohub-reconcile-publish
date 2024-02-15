import ttl2jsonld from "@frogcat/ttl2jsonld";
import jsonld from "jsonld";
import { context } from "./context.js";

function NoPrefNamespaceUriError(message) {
  this.message = message;
  this.name = "NoPrefNamespaceUriError";
}

export const buildJSON = async (ttlString, account) => {
  const doc = ttl2jsonld.parse(ttlString);
  const expanded = await jsonld.expand(doc);
  const compacted = await jsonld.compact(expanded, context);
  // TODO get all available languages and store them as attribute for Concept Scheme
  let entries = [];
  const dataset = compacted["@graph"].find(g => g.type === "ConceptScheme").id;
  console.log("found dataset", dataset)

  compacted["@graph"].forEach((graph, _) => {
    const { ...properties } = graph;
    const type = Array.isArray(properties.type)
      ? properties.type.find((t) => ["Concept", "ConceptScheme"])
      : properties.type;

    // only use properties we actually want to send to ES
    const {
      prefLabel,
      altLabel,
      hiddenLabel,
      title,
      description,
      note,
      scopeNote,
      editorialNote,
      historyNote,
      changeNote,
      definition,
      example,
      inScheme,
      id,
      notation,
      broader,
      narrower,
      preferredNamespaceUri,
      topConceptOf
    } = properties;

    const node = {
      type,
      prefLabel,
      altLabel,
      hiddenLabel,
      title,
      description,
      note,
      scopeNote,
      editorialNote,
      historyNote,
      changeNote,
      definition,
      example,
      inScheme,
      id,
      notation,
      broader,
      narrower,
      preferredNamespaceUri,
      topConceptOf
    };

    if (node.type === "ConceptScheme") {
      if (node?.preferredNamespaceUri === undefined) {
        throw new NoPrefNamespaceUriError(
          `ConceptScheme ${node.id} does not have a preferredNamespaceUri`
        );
      }
      if (typeof node.preferredNamespaceUri === "string") {
        const id = node.preferredNamespaceUri;
        node.preferredNamespaceUri = { id };
      }
    } else if (node.type === "Concept") {
      if (node.topConceptOf) {
        node.inScheme = node.topConceptOf;
      }
    }

    node["dataset"] = dataset;
    node["account"] = account;

    entries.push(node);
  });
  return { account: account, dataset: dataset, entries: entries };
};
