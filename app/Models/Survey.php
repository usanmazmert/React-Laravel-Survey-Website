<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'description', 'expire_date', 'image', 'user_id', 'status', 'created_at', 'updated_at'];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions() // We need this relation function to be able to return questions inside SurveyResource.
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answers() // We need this relation function to be able to return answers inside SurveyResource.
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
