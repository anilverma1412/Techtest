<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    /**
     * Store a newly created article in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create($request->all());
        return response()->json($article, Response::HTTP_CREATED);
    }

    /**
     * Display the specified article.
     *
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Article $article)
    {
        return response()->json($article);
    }

    /**
     * Update the specified article in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $article->update($request->all());
        return response()->json($article);
    }

    /**
     * Remove the specified article from storage.
     *
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

}
