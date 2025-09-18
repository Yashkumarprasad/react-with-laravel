<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('author')->paginate(15)->withQueryString();
        $blogs->links = view('pagination::default', ['paginator' => $blogs])->render();
        return Inertia::render('Admin/Blogs/Index', ['blogs' => $blogs]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    public function store(Request $r)
    {
        $r->validate(['title' => 'required', 'content' => 'required']);
        Blog::create(['title' => $r->title, 'content' => $r->content, 'published' => $r->boolean('published'), 'user_id' => Auth::id()]);
        return redirect()->route('admin.blogs.index');
    }

    public function edit($id)
    {
        $blog = Blog::findOrFail($id);
        return Inertia::render('Admin/Blogs/Edit', ['blog' => $blog]);
    }

    public function update(Request $r, $id)
    {
        $blog = Blog::findOrFail($id);
        $r->validate(['title' => 'required', 'content' => 'required']);
        $blog->update($r->only('title', 'content', 'published'));
        return redirect()->route('admin.blogs.index');
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        return redirect()->route('admin.blogs.index');
    }
}