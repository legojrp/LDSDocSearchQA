from flask import Flask, request, jsonify
from flask_cors import CORS
from search import answer_question
import requests
import json
import references
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    answer =answer_question(query)
    references = answer["references"]
    references_given = []
    for reference in references:
        response = json.loads(requests.get(f"https://openscriptureapi.org/api/scriptures/v1/lds/en/referencesParser?reference={reference}").text)
        references_given.append(response)

    print (references_given)

    # TO DO: implement search logic
    return jsonify({'answer': answer["answer"], "references": answer["references"]})

@app.route("/references", methods=["GET"])
def parse():
    query = request.args.get("query")
    try :
        query_list = json.loads(query)
        r = []
        for q in query_list:
            r.append({"reference" : q, "content": references.get_reference(q)})
        return jsonify(found_references=r)
    except:
        return jsonify({"error": "Invalid query"})





if __name__ == '__main__':
    app.run(debug=True, port=3050)

