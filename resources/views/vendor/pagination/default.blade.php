@if ($paginator->hasPages())
    <nav>
        <ul class="inline-flex -space-x-px">
            @foreach ($elements as $element)
                @if (is_string($element))
                    <li><span>{{ $element }}</span></li>
                @endif

                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        <li><a href="{{ $url }}" class="px-3 py-1">{{ $page }}</a></li>
                    @endforeach
                @endif
            @endforeach
        </ul>
    </nav>
@endif