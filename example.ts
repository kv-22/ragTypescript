import { Document, SentenceWindowNodeParser, VectorStoreIndex } from "llamaindex";

console.log('this is rag');
async function main() {
    const text = "The concept of Retrieval Augmented Generation (RAG) describes an approach to allow an LLM to answer questions based on data that it wasn’t originally trained on. In order to do this, an LLM must be fed this data as part of the prompt, which is generally referred to as ‘context’. However, LLMs have limited input size restrictions (also called token input size), which make it impossible and impractical to pass large datasets, such as the Warren Report, in their entirety via the prompt. Instead, with the RAG-approach, a query to an LLM is broken into two parts: a ‘retrieval step’ and then a ‘generation step’. The ‘retrieval step’ attempts to identify the portions of the original dataset that are most relevant to a user supplied query and to only pass this subset of data to an LLM, alongside the original query, as part of the ‘generative step’. Essentially, RAG is a mechanism to work within the input size restrictions of LLMs by only including in the prompt the most relevant parts of the dataset needed to answer a query. Usually, the ‘retrieval’ portion of RAG utilizes tried-and-true semantic search algorithms such as Cosine Similarity, alongside a Vector Databases to perform this step.";
    const query = 'What is RAG?';

    const document = new Document({ text });

    const sentence_window_node_parser = new SentenceWindowNodeParser();
    const sentence_window_node_parser_nodes = sentence_window_node_parser.getNodesFromDocuments([document]);
    console.log(sentence_window_node_parser_nodes);

    const index = await VectorStoreIndex.fromDocuments([document]);
    // const index2 = await VectorStoreIndex.init(nodes=sentence_window_node_parser_nodes);
    // index2.buildIndexFromNodes(nodes);


    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({ query });

    console.log(response);
}

main().catch(console.error);