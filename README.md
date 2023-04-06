# SkoHub Reconcile Publish

This respository provides a simple web service that can be used to publish vocabularies as Turtle Files to the [SkoHub Reconcile Service](https://github.com/skohub-io/skohub-reconcile).

It is a simple Express.js application that provides an HTML-Upload form on its root and an upload endpoint under `/upload`.

Files are stored in an `uploads` folder.

curl command: curl -F uploaded_file=@./uploads/dini-ag-kim/hcrt.ttl -F account=test -F id=123 http://localhost:3030/upload
