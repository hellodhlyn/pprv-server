package main

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/julienschmidt/httprouter"
)

type graphqlRequest struct {
	Query string `json:"query"`
}

func graphqlQuery(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var graphqlReq graphqlRequest
	err = json.Unmarshal(body, &graphqlReq)
	if err != nil || !strings.HasPrefix(strings.TrimSpace(graphqlReq.Query), "query") {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	res, err := remotePOST("/graphql", bytes.NewBuffer(body))
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		return
	}

	for k, vs := range res.Header {
		for _, v := range vs {
			w.Header().Add(k, v)
		}
	}
	_, _ = io.Copy(w, res.Body)
	w.WriteHeader(res.StatusCode)
	_ = res.Body.Close()
}

func main() {
	router := httprouter.New()
	router.POST("/graphql", graphqlQuery)

	log.Fatal(http.ListenAndServe(":8080", router))
}
