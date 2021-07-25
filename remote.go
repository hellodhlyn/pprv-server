package main

import (
	"io"
	"net/http"
	"os"
)

var remoteClient = &http.Client{}
var remoteHost = os.Getenv("PPRV_REMOTE_HOST")

func remotePOST(path string, body io.Reader) (*http.Response, error) {
	req, _ := http.NewRequest("POST", remoteHost+path, body)
	req.Header.Add("Content-Type", "application/json; encode=utf-8")
	return remoteClient.Do(req)
}
